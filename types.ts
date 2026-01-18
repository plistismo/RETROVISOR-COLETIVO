export interface BusLine {
  id: string;
  lineNumber: string;
  destination: string; // Used as TP (Terminal Principal)
  secondaryDestination: string; // Used as TS (Terminal Secundário)
  intermediateDestinations: string[]; // Names to scroll through between TP and TS
  companyName: string;
  companyLogoText: string;
  color: string; // Hex code for the bus body
  year: string;
  description: string;
  history: string;
  plate: string;
  viaSign: string; // Text for the small sign on the windshield (e.g., "VIA JOÃO DIAS")
  itinerary?: string[]; // Optional list of streets
}