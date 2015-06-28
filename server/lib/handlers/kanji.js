module.exports = function(models) {
  "use strict";

  var relations = require("kanji-relations");

  var unknownrelations = {parents:[], children: []};

  var bushu = require("../../../lib/bushu");

  // Post-find handler, to add in the kanji relation
  // data from the relationship package.
  var enrich = function enrich(data) {
    var kanji = data.literal;
    var extended = relations.get(kanji) || unknownrelations;
    data.parents = extended.parents;
    data.children = extended.children;33
    data.radicalnumber = data.radical;
    data.radical = bushu[parseInt(data.radical,10)];
  };

  var overrides = {
    findAll: function(options, next, sanitizeSQL, runQuery, prefix) {

      try { options = JSON.parse(options); } catch (e) {}
      if (typeof options === "string") {
        options = {kanji: options};
      }

      if (options.kanji) {
        return overrides.findUsingKanji(options.kanji, next, sanitizeSQL, runQuery, prefix);
      }

      else {
        var tables = ["kanji_dictionary_json AS json"];
        var wheres = [];

        if (!!options.reading) {
          tables.push("kanji_dictionary_reb AS reading");
          wheres.push("(reading.data = '%reading' AND json.id = reading.id)");
        }
        if (!!options.meaning) {
          tables.push("kanji_dictionary_eng AS meaning");
          wheres.push("(meaning.data = '%meaning' AND json.id = meaning.id)");
        }
        if (!!options.radical) {
          tables.push("kanji_dictionary_rad AS radical");
          wheres.push("(cast(radical.data as Integer) = %radical AND json.id = radical.id)");
        }
        if (!!options.strokecount && options.strokecount !== "any") {
          tables.push("kanji_dictionary_strokes AS strokes");
          var cmp = "=";
          if (options.strokecmp === "<=") { cmp = "<="; }
          if (options.strokecmp === ">=") { cmp = ">="; }
          wheres.push("(cast(strokes.data as Integer) " + cmp + " %strokecount AND json.id = strokes.id)");
        }
        if (!!options.grade) {
          tables.push("kanji_dictionary_grade AS grade");
          wheres.push("(cast(grade.data as Integer) = %grade AND json.id = grade.id)");
        }
        if (!!options.frequency) {
          tables.push("kanji_dictionary_frequency AS freq");
          wheres.push("(cast(freq.data as Integer) = %freq AND json.id = freq.id)");
        }
        if (!!options.jlpt) {
          tables.push("kanji_dictionary_jlpt AS jlpt");
          wheres.push("(cast(jlpt.data as Integer) = %jlpt AND json.id = jlpt.id)");
        }
      }
      var tables = tables.join(", ");
      var wheres = wheres.join(" AND ");

      Object.keys(options).forEach(function(opt) {
        wheres = wheres.replace('%'+opt, options[opt]);
      });

      var query = "SELECT json.data AS json FROM " + tables + " WHERE " + wheres;
      //console.log(query);
      runQuery(query, function(err, result) {
        result.forEach(function(r) { enrich(r); });
        next(err, result);
      });
    },
    findUsingKanji: function(kanji, next, sanitizeSQL, runQuery, prefix) {
      kanji = sanitizeSQL(kanji).replace(/\*/g,'%');
      var query = "SELECT json.data AS json FROM kanji_dictionary_json AS json WHERE json.id = '"+kanji+"'";
      runQuery(query, function(err, result) {
        result.forEach(function(r) { enrich(r); });
        next(err, result);
      });
    }
    // findUsingKana is fine as is
    // findUsingEnglish is fine as is
  };

  // override for findUsingKanji, since that's
  // just a get for the kanji database.
  var f
  var options = {
    sequelize: models.sequelizek,
    prefix: "kanji_",
    json: models.kanji_dictionary_JSON,
    kanji: false,
    kana: models.kanji_dictionary_reb,
    english: models.kanji_dictionary_eng,
    postFindEntry: enrich,

    findAll: overrides.findAll,
	  findUsingKanji: overrides.findUsingKanji
  };

  return require("./base/generic")(options);
};
