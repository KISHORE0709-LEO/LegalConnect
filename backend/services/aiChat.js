class AIChatService {
  constructor() {
    this.conversationHistory = new Map();
  }

  async generateResponse(message, userId = 'default') {
    try {
      // Get conversation history
      const history = this.conversationHistory.get(userId) || [];
      
      // Generate contextual legal response
      const response = this.generateLegalResponse(message, history);
      
      // Update conversation history
      history.push({ user: message, ai: response, timestamp: Date.now() });
      if (history.length > 10) history.shift(); // Keep last 10 exchanges
      this.conversationHistory.set(userId, history);
      
      return response;
    } catch (error) {
      console.error('AI Chat Service Error:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try rephrasing your question or contact our support team.";
    }
  }

  generateLegalResponse(message, history = []) {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your AI legal assistant. I can help you with contracts, employment law, property rights, business formation, intellectual property, and many other legal matters. What legal question do you have today?";
    }
    
    // Contract-related queries
    if (lowerMessage.includes('contract') || lowerMessage.includes('agreement')) {
      if (lowerMessage.includes('review') || lowerMessage.includes('check')) {
        return "When reviewing contracts, focus on these key areas: 1) Scope of work and deliverables 2) Payment terms and schedules 3) Termination clauses 4) Liability and indemnification 5) Intellectual property rights 6) Dispute resolution. Would you like me to explain any of these areas in detail?";
      }
      if (lowerMessage.includes('sign') || lowerMessage.includes('signing')) {
        return "Before signing any contract, ensure you: 1) Understand all terms and conditions 2) Verify payment schedules and amounts 3) Check termination procedures 4) Review liability limitations 5) Confirm dispute resolution methods. Never sign under pressure - take time to review thoroughly. Do you have specific clauses you're concerned about?";
      }
      return "Contracts are legally binding agreements requiring offer, acceptance, consideration, and legal capacity. Key elements to watch: clear terms, fair payment conditions, reasonable termination clauses, and balanced liability. What specific aspect of your contract concerns you?";
    }
    
    // Employment law queries
    if (lowerMessage.includes('employment') || lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('employee')) {
      if (lowerMessage.includes('fired') || lowerMessage.includes('terminated') || lowerMessage.includes('dismissal')) {
        return "Employment termination laws vary by state. Generally, most employment is 'at-will' but there are exceptions for discrimination, retaliation, or contract violations. Document everything, review your employee handbook, and consider consulting an employment attorney if you believe the termination was unlawful. What circumstances led to the termination?";
      }
      if (lowerMessage.includes('harassment') || lowerMessage.includes('discrimination')) {
        return "Workplace harassment and discrimination are serious legal matters. Document all incidents with dates, witnesses, and details. Report to HR or management following company procedures. You're protected from retaliation for reporting. Consider filing with EEOC if internal processes fail. Do you need guidance on documentation or reporting procedures?";
      }
      return "Employment law covers hiring, workplace rights, wages, benefits, and termination. Key protections include anti-discrimination laws, wage/hour regulations, and workplace safety. Are you dealing with a specific employment issue like contracts, workplace problems, or termination concerns?";
    }
    
    // Property/Real Estate queries
    if (lowerMessage.includes('property') || lowerMessage.includes('real estate') || lowerMessage.includes('rent') || lowerMessage.includes('lease')) {
      if (lowerMessage.includes('tenant') || lowerMessage.includes('landlord')) {
        return "Landlord-tenant law varies by state but generally covers: security deposits, habitability standards, eviction procedures, and rent control. Tenants have rights to safe, habitable housing and protection from illegal eviction. Landlords must follow proper notice procedures. Are you dealing with a specific rental issue?";
      }
      if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('buying')) {
        return "Real estate purchases involve: purchase agreements, title searches, inspections, financing, and closing. Key protections include contingency clauses, disclosure requirements, and title insurance. Always review all documents carefully and consider having an attorney review complex transactions. What stage of the buying process are you in?";
      }
      return "Property law covers ownership, transfers, leases, and disputes. Whether buying, selling, or renting, ensure you understand your rights and obligations. Key areas include contracts, disclosures, financing terms, and dispute resolution. What type of property matter are you dealing with?";
    }
    
    // Business law queries
    if (lowerMessage.includes('business') || lowerMessage.includes('company') || lowerMessage.includes('startup') || lowerMessage.includes('llc') || lowerMessage.includes('corporation')) {
      return "Business formation involves choosing entity type (LLC, Corporation, Partnership), registering with the state, obtaining licenses, and setting up proper governance. Consider liability protection, tax implications, and operational flexibility. Key documents include articles of incorporation, operating agreements, and bylaws. What type of business are you starting?";
    }
    
    // Intellectual Property queries
    if (lowerMessage.includes('patent') || lowerMessage.includes('trademark') || lowerMessage.includes('copyright') || lowerMessage.includes('intellectual property')) {
      return "Intellectual property includes patents (inventions), trademarks (brands), copyrights (creative works), and trade secrets. Each has different protection requirements and durations. Patents require novelty and non-obviousness, trademarks need distinctiveness, copyrights protect original expression. What type of IP are you looking to protect?";
    }
    
    // Family law queries
    if (lowerMessage.includes('divorce') || lowerMessage.includes('custody') || lowerMessage.includes('child support') || lowerMessage.includes('family')) {
      return "Family law matters include divorce, child custody, support, and property division. Each state has different laws regarding grounds for divorce, custody standards, and support calculations. Consider mediation for amicable resolutions. Complex cases involving significant assets or custody disputes often require legal representation. What family law issue are you facing?";
    }
    
    // Criminal law queries
    if (lowerMessage.includes('criminal') || lowerMessage.includes('arrest') || lowerMessage.includes('charge') || lowerMessage.includes('police')) {
      return "If facing criminal charges, you have important rights: remain silent, legal representation, due process, and protection from unreasonable searches. Exercise your right to remain silent and request an attorney immediately. Don't discuss your case without legal counsel present. Serious criminal matters require immediate professional legal help.";
    }
    
    // General legal advice
    if (lowerMessage.includes('legal advice') || lowerMessage.includes('lawyer') || lowerMessage.includes('attorney')) {
      return "I can provide general legal information, but for specific legal advice tailored to your situation, consult with a qualified attorney. Many lawyers offer free consultations. Consider your local bar association's referral service for finding appropriate legal representation. What type of legal matter do you need help with?";
    }
    
    // Default response with context from conversation
    const recentTopics = history.slice(-3).map(h => h.user.toLowerCase()).join(' ');
    if (recentTopics.includes('contract')) {
      return "Continuing our contract discussion - I can help clarify specific clauses, explain legal terms, or guide you through the review process. What particular aspect would you like to explore further?";
    }
    
    return `I understand you're asking about "${message}". As your AI legal assistant, I can help with contracts, employment law, property rights, business formation, intellectual property, family law, and more. Could you provide more specific details about your legal situation so I can give you more targeted guidance?`;
  }
}

module.exports = AIChatService;