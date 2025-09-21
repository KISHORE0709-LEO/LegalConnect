const { BigQuery } = require('@google-cloud/bigquery');

class AnalyticsService {
  constructor() {
    this.bigquery = new BigQuery();
    this.dataset = this.bigquery.dataset('legal_connect_analytics');
  }

  async trackDocumentEvent(eventData) {
    const table = this.dataset.table('document_events');
    await table.insert([{
      ...eventData,
      timestamp: new Date().toISOString()
    }]);
  }

  async getUsageStats(timeRange = '7d') {
    const query = `
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as document_count,
        AVG(processing_time) as avg_processing_time
      FROM \`${this.bigquery.projectId}.legal_connect_analytics.document_events\`
      WHERE timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL ${timeRange.replace('d', ' DAY')})
      GROUP BY date
      ORDER BY date DESC
    `;
    
    const [rows] = await this.bigquery.query(query);
    return rows;
  }

  async exportToDataStudio() {
    const query = `
      CREATE OR REPLACE VIEW \`${this.bigquery.projectId}.legal_connect_analytics.dashboard_view\` AS
      SELECT 
        DATE(timestamp) as date,
        event_type,
        COUNT(*) as event_count,
        AVG(processing_time) as avg_processing_time
      FROM \`${this.bigquery.projectId}.legal_connect_analytics.document_events\`
      GROUP BY date, event_type
    `;
    
    await this.bigquery.query(query);
  }
}

module.exports = AnalyticsService;