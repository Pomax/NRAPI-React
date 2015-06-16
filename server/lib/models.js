module.exports = function(Sequelize) {
  "use strict";

  var jp = new Sequelize("jmdict",'','', {
				dialect: "sqlite",
        storage: __dirname + "/../data/jmdict.sqlite3",
				logging: false
			}),

      kanji = new Sequelize("jmdict",'','', {
        dialect: "sqlite",
        storage: __dirname + "/../data/kanjidic2.sqlite3",
        logging: false
      }),

      names = new Sequelize("jmdict",'','', {
        dialect: "sqlite",
        storage: __dirname + "/../data/jmnedict.sqlite3",
        logging: false
      });

	var ext = {
	  timestamps: false,
	  freezeTableName: true
	};

  var dictionary_JSON         = jp.define("dictionary_JSON",         { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
	var dictionary_reb          = jp.define("dictionary_reb",          { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
	var dictionary_keb          = jp.define("dictionary_keb",          { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
	var dictionary_sense_xref   = jp.define("dictionary_sense_xref",   { "id": Sequelize.INTEGER(12), "sense": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
	var dictionary_sense_ant    = jp.define("dictionary_sense_ant",    { "id": Sequelize.INTEGER(12), "sense": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
	var dictionary_pos          = jp.define("dictionary_pos",          { "id": Sequelize.INTEGER(12), "sense": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
	var dictionary_eng          = jp.define("dictionary_eng",          { "id": Sequelize.INTEGER(12), "sense": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);

  var kanji_dictionary_JSON      = kanji.define("kanji_dictionary_JSON",      { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);
  var kanji_dictionary_reb       = kanji.define("kanji_dictionary_reb",       { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);
  var kanji_dictionary_eng       = kanji.define("kanji_dictionary_eng",       { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);
  var kanji_dictionary_rad       = kanji.define("kanji_dictionary_rad",       { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);
  var kanji_dictionary_grade     = kanji.define("kanji_dictionary_grade",     { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);
  var kanji_dictionary_strokes   = kanji.define("kanji_dictionary_strokes",   { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);
  var kanji_dictionary_frequency = kanji.define("kanji_dictionary_frequency", { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);
  var kanji_dictionary_jlpt      = kanji.define("kanji_dictionary_jlpt",      { "id": Sequelize.STRING(4), "data": Sequelize.TEXT }, ext);

  var name_dictionary_JSON = names.define("name_dictionary_JSON", { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
  var name_dictionary_keb  = names.define("name_dictionary_keb",  { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
  var name_dictionary_reb  = names.define("name_dictionary_reb",  { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
  var name_dictionary_eng  = names.define("name_dictionary_eng",  { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);
  var name_dictionary_type = names.define("name_dictionary_type", { "id": Sequelize.INTEGER(12), "data": Sequelize.TEXT }, ext);


  return {
    sequelizej: jp
  , sequelizek: kanji
  , sequelizen: names

    // jmdict models
	, dictionary_JSON         : dictionary_JSON
	, dictionary_reb          : dictionary_reb
	, dictionary_keb          : dictionary_keb
	, dictionary_sense_xref   : dictionary_sense_xref
	, dictionary_sense_ant    : dictionary_sense_ant
	, dictionary_pos          : dictionary_pos
	, dictionary_eng          : dictionary_eng

    // kanjidic2 models
  , kanji_dictionary_JSON      : kanji_dictionary_JSON
  , kanji_dictionary_reb       : kanji_dictionary_reb
  , kanji_dictionary_eng       : kanji_dictionary_eng
  , kanji_dictionary_rad       : kanji_dictionary_rad
  , kanji_dictionary_grade     : kanji_dictionary_grade
  , kanji_dictionary_strokes   : kanji_dictionary_strokes
  , kanji_dictionary_frequency : kanji_dictionary_frequency
  , kanji_dictionary_jlpt      : kanji_dictionary_jlpt

  // jmnedict models
  , name_dictionary_JSON : name_dictionary_JSON
  , name_dictionary_keb  : name_dictionary_keb
  , name_dictionary_reb  : name_dictionary_reb
  , name_dictionary_eng  : name_dictionary_eng
  , name_dictionary_type : name_dictionary_type

  };

};
