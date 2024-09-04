// https://raw.githubusercontent.com/lerocha/chinook-database/master/ChinookDatabase/DataSources/Chinook_Sqlite.sql
export enum DataType {
	SmallInteger,
	MediumInteger,
	BigInteger,
	Varchar,
	Text,
	Enumeration,
	Json,
	Bin,
	Hex,
	Url,
}
export interface Insert {
	tableName: string;
	columnName: string;
	definition: string;
}
export interface Selectable {
	name: string;
	schema: string;
	nullable: boolean;
	dataType: DataType;
}
/**
 * CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  body TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT FALSE
)
 */
const currentTables = new Set();
export const getDateToken = (format: string) => {
	const date = new Date();
	switch (format || "web") {
		case "clf":
			return date;
		case "iso":
			return date.toISOString();
		case "web":
			return date.toUTCString();
	}
};
function database() {
	const table = new Map();
	const statement = [];
	return {
		setColumnAutoIncrement: () => table,
		addColumn: (columnName: string, definition: string) => {
			currentTables.add();
			table.set(columnName.toLowerCase(), definition);
		},
	};
}

/**
 * table.set('AlbumId' , 'INTEGER  NOT NULL')
table.set('AlbumId' , 'INTEGER  NULL')
table.set('Title' , 'NVARCHAR(160)  NOT NULL')
table.set('Title' , 'NVARCHAR(160)  NOT NULL')
table.set('ArtistId' , 'INTEGER  NOT NULL')
table.set('ArtistId' , 'INTEGER  NOT NULL')
table.set('CONSTRAINT' , 'PK_Album PRIMARY KEY  ([AlbumId])')
table.set('CONSTRAINT' , 'PK_Album PRIMARY KEY  ([AlbumId])')

 */
currentTables.add("product");
console.log(currentTables);
