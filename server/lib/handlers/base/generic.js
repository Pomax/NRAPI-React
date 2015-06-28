module.exports = function(options) {
  "use strict";

  var IME = require("jp-conversion");

  var sequelize = options.sequelize,
      prefix = options.prefix || "",

      jsonModel = options.json,
      kanjiModel = options.kanji,
      kanaModel = options.kana,
      englishModel = options.english;

  var overrides = {
    findEntry: options.findEntry,
    findAll: options.findAll,
    findUsingKanji: options.findUsingKanji,
    findUsingKana: options.findUsingKana,
    findUsingEnglish: options.findUsingEnglish
  };

  // minor data massage, so that once the input is handed to
  // SQL, there are no quotes left in it, and the * wildcard
  // has been turned into the % wildcard instead.
  var sanitizeSQL = function(term) {
    if(!term) return term;
    return term.replace(/'/g, '');
  };

  var runQuery = function(query, next) {
    sequelize
    .query(query)
    .error(function(err) { next(err); })
    .success(function(json) {
      json = json.map(function(line) {
        var b = new Buffer(line.json,'base64');
        return JSON.parse(b.toString('utf-8'));
      });
      next(false, json);
    });
  };

  return {
    /**
     * find an entry by its id
     */
    findEntry: function(id, next) {
      if(overrides.findEntry) { return overrides.findEntry.call(this, id, next); }
      var query = "SELECT json.data AS json FROM "+prefix+"dictionary_json AS json " +
                  "WHERE json.id = " + id;
      runQuery(query, next);
    },

    /**
     * find all entries based on search terms
     */
    findAll: function(term, next) {
      if(overrides.findAll) {
        return overrides.findAll.call(this, term, next, sanitizeSQL, runQuery, prefix);
      }
      var handler = this;
      var interpreted = IME.convert(term.toLowerCase());
      if(interpreted === false) {
        return this.findUsingEnglish(term, next);
      }
      if(interpreted.kanji) {
        return this.findUsingKanji(interpreted.kanji, next);
      }
      if(interpreted.hiragana || interpreted.katakana) {
        if(!term.match(/[\u3041-\u30FA]/) && interpreted.romaji) {
          return handler.findUsingEnglish(interpreted.romaji, function(err, results) {
            if(err) { return next(err,results); }
            handler.findUsingKana(interpreted.hiragana, interpreted.katakana, function(err, moreResults) {
              next(err, results.concat([false]).concat(moreResults));
            });
          });
        } else {
          return this.findUsingKana(interpreted.hiragana, interpreted.katakana, next);
        }
      }
      next("unknown input language", interpreted);
    },

    /**
     * find all ids based on kanji hits
     */
    findUsingKanji: function(kanji, next) {
      kanji = sanitizeSQL(kanji).replace(/\*/g,'%');
      if(overrides.findUsingKanji) {
        return overrides.findUsingKanji.call(this, kanji, next, sanitizeSQL, runQuery, prefix);
      }
      var query = "SELECT DISTINCT json.data AS json FROM "+prefix+"dictionary_json AS json, "+prefix+"dictionary_keb AS keb " +
                  "WHERE keb.data LIKE '"+kanji.replace(/\*/g,'%') +"' AND json.id = keb.id";
      runQuery(query, next);
    },

    /**
     * find all ids based on kana hits
     */
    findUsingKana: function(hiragana, katakana, next) {
      hiragana = sanitizeSQL(hiragana);
      katakana = sanitizeSQL(katakana);
      if(overrides.findUsingKana) {
        return overrides.findUsingKana.call(this, hiragana, katakana, next, sanitizeSQL, runQuery, prefix);
      }
      var query = "SELECT DISTINCT json.data AS json FROM "+prefix+"dictionary_json AS json, "+prefix+"dictionary_reb AS reb WHERE ";
      var opts = [];
      if(hiragana) { opts.push(" reb.data LIKE '" + hiragana.replace(/\*/g,'%') + "'"); }
      if(katakana) { opts.push(" reb.data LIKE '" + katakana.replace(/\*/g,'%') + "'"); }
      query += "(" + opts.join("OR") + ") AND json.id = reb.id";
      runQuery(query, next);
    },

    /**
     * find all ids based on english hits
     */
    findUsingEnglish: function(eng, next) {
      eng = sanitizeSQL(eng);
      if(overrides.findUsingEnglish) {
        return overrides.findUsingEnglish.call(this, eng, next, sanitizeSQL, runQuery, prefix);
      }
      var query = "SELECT DISTINCT json.data AS json FROM "+prefix+"dictionary_json AS json, "+prefix+"dictionary_eng AS eng " +
                  "WHERE eng.data LIKE '"+eng.replace(/\*/g,'%')+"' AND json.id = eng.id";
      runQuery(query, next);
    }
  };
};
