# Refactor Home Page Components for Better Structure

## Overview
Refactor the monolithic LawyerConnectShowcase and CourtLocatorShowcase components into smaller, modular sub-components for improved organization, maintainability, and reusability. This will break down the home page sections without changing the visual output.

## Steps

### LawyerConnectShowcase Refactor
- [x] Create `src/components/LawyerFlowDiagram.tsx` - Extract the flow diagram section (AI Analysis, Risk Alert, Expert Match).
- [ ] Create `src/components/LawyerCards.tsx` - Extract the verified lawyers cards section.
- [ ] Create `src/components/LawyerFeatures.tsx` - Extract the features grid (Secure Chat, Verified Lawyers, etc.).
- [ ] Create `src/components/LawyerCTA.tsx` - Extract the CTA section (Ready to Connect...).
- [ ] Update `src/components/LawyerConnectShowcase.tsx` - Refactor to import and use the new sub-components, removing the extracted code.

### CourtLocatorShowcase Refactor
- [ ] Create `src/components/CourtFlowDiagram.tsx` - Extract the flow diagram section (Case Analysis, Location Match, Filing Guide).
- [ ] Create `src/components/CourtCards.tsx` - Extract the courts & authorities cards section.
- [ ] Create `src/components/CourtFeatures.tsx` - Extract the features grid (Location-Based, Filing Guidance, etc.).
- [ ] Create `src/components/CourtCTA.tsx` - Extract the CTA section (Ready to Take Legal Action...).
- [ ] Update `src/components/CourtLocatorShowcase.tsx` - Refactor to import and use the new sub-components, removing the extracted code.

### Final Steps
- [ ] Test the home page (`src/pages/Index.tsx`) to ensure no visual or functional changes.
- [ ] Verify responsiveness across devices.
- [ ] Clean up any unused imports or code.

## Notes
- Ensure all sub-components maintain the exact same styling and content as the original sections.
- No changes to `src/pages/Index.tsx` or other files unless necessary.
- After completion, the home page should render identically but with better code structure.
