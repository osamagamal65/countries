
type CountryMaps = 'googleMaps' | 'openStreetMaps';

export interface Country {
  name:         Name;
  tld:          string[];
  cca2:         string;
  ccn3:         string;
  cca3:         string;
  cioc:         string;
  independent:  boolean;
  status:       string;
  unMember:     boolean;
  currencies:   {[key: string]: Currency};
  idd:          Idd;
  capital:      string[];
  altSpellings: string[];
  region:       string;
  subregion:    string;
  languages:    {[key: string]: string};
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders:      string[];
  area:         number;
  flag:         string;
  maps:         {[key in CountryMaps]: string};
  population:   number;
  fifa:         string;
  timezones:    string[];
  continents:   string[];
  flags:        Flag;
  startOfWeek:  string;
  capitalInfo:  {[key: string]: string[]};
}


export interface Currency {
  name:   string;
  symbol: string;
}

export interface Idd {
  root:     string;
  suffixes: string[];
}


export interface Name {
  common:     string;
  official:   string;
  nativeName: {[key: string]: Translation};
}

export interface Translation {
  official: string;
  common:   string;
}

export interface Flag {
  png: string,
  svg: string
}


/**
 *
 * @param json
 * @returns
 */
function jsonToCountry(json: string): Country { return JSON.parse(json); }

/**
 *
 * @param value {Country} title
 * @returns
 */
function countryToJson(value: Country): string {return JSON.stringify(value)};

