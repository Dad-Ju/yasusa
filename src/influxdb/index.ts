import { InfluxDB } from '@influxdata/influxdb-client'

const org = 'PurpleMoon Development'

const EnumBuckets = {
	live: `live_${process.env.dev ? 'dev' : 'prod'}`,
	nice: `nice_${process.env.dev ? 'dev' : 'prod'}`,
	cold: `cold_${process.env.dev ? 'dev' : 'prod'}`,
}

const token = process.env.INFLUXDB_TOKEN
const url = process.env.INFLUXDB_URL

const influxClient = new InfluxDB({ url, token })

const LiveBucketWriter = influxClient.getWriteApi(org, EnumBuckets.live)
const NiceBucketWriter = influxClient.getWriteApi(org, EnumBuckets.nice)
const ColdBucketWriter = influxClient.getWriteApi(org, EnumBuckets.cold)
const QueryClient = influxClient.getQueryApi(org)

export const influxHandler = {
	live: LiveBucketWriter,
	nice: NiceBucketWriter,
	cold: ColdBucketWriter,
	query: QueryClient,
}

export default influxClient
