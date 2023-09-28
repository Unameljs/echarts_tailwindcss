export interface Region {
	id: number;
	name: string;
	value: number;
}

export interface RegionData {
	regions: Region[];
}

export interface Server {
	id: number;
	name: string;
	value: number;
}

export interface ServerData {
	servers: Server[];
}

export interface Risk {
	id: number;
	name: string;
	value: number;
}

export interface RiskData {
	risks: Risk[];
}

export interface Abnormal {
	id: number;
	name: string;
	value: number;
}

export interface AbnormalData {
	abnormals: Abnormal[];
}

export interface Relation {
	id: number;
	name: string;
	source: string;
	target: string;
	speed: number;
	value: number[];
}

export interface RelationData {
	relations: Relation[];
}

export interface Data {
	value: number;
	name: string;
}

export interface WordCloudData {
	datas: Data[];
}

export interface TotalData {
	total: string;
	hb: string;
	db: string;
	hd: string;
	zn: string;
	xn: string;
	xb: string;
}

export interface CategoryData {
	[x: string]: city[];
}

export interface city {
	name: string;
	value: number[];
}

export interface TopData {
	[x: string]: city[];
}

export interface MapData {
	voltageLevel: string[];
	colors: string[];
	categoryData: CategoryData;
	topData: TopData;
}

export interface Data {
	regionData: RegionData;
	serverData: ServerData;
	riskData: RiskData;
	abnormalData: AbnormalData;
	relationData: RelationData;
	wordCloudData: WordCloudData;
	totalData: TotalData;
	mapData: MapData;
}

export interface RootObject {
	success: boolean;
	code: number;
	data: Data;
	message: string;
}