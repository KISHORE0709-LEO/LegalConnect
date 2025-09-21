const { Logging } = require('@google-cloud/logging');

class MonitoringService {
  constructor() {
    this.logging = new Logging();
    this.log = this.logging.log('legal-connect-app');
  }

  logRequest(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      
      const metadata = {
        resource: { type: 'gae_app' },
        severity: res.statusCode >= 400 ? 'ERROR' : 'INFO'
      };
      
      const entry = this.log.entry(metadata, {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        timestamp: new Date().toISOString()
      });
      
      this.log.write(entry);
    });
    
    next();
  }

  logError(error, req) {
    const metadata = {
      resource: { type: 'gae_app' },
      severity: 'ERROR'
    };
    
    const entry = this.log.entry(metadata, {
      error: error.message,
      stack: error.stack,
      method: req?.method,
      url: req?.url,
      timestamp: new Date().toISOString()
    });
    
    this.log.write(entry);
  }

  logPerformance(operation, duration, metadata = {}) {
    const entry = this.log.entry({
      resource: { type: 'gae_app' },
      severity: 'INFO'
    }, {
      operation,
      duration: `${duration}ms`,
      ...metadata,
      timestamp: new Date().toISOString()
    });
    
    this.log.write(entry);
  }
}

module.exports = MonitoringService;