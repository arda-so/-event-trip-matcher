export type TicketmasterEventResponse = {
  _embedded?: {
    events?: TicketmasterEvent[];
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

export type TicketmasterEvent = {
  id: string;
  name: string;
  url?: string;
  info?: string;
  pleaseNote?: string;
  dates?: {
    start?: {
      dateTime?: string;
      localDate?: string;
      localTime?: string;
    };
    end?: {
      dateTime?: string;
    };
    status?: {
      code?: string;
    };
  };
  priceRanges?: Array<{
    type?: string;
    currency?: string;
    min?: number;
    max?: number;
  }>;
  classifications?: Array<{
    segment?: {
      name?: string;
    };
    genre?: {
      name?: string;
    };
  }>;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  _embedded?: {
    venues?: Array<{
      name: string;
      city?: {
        name?: string;
      };
      country?: {
        countryCode?: string;
        name?: string;
      };
      address?: {
        line1?: string;
      };
      location?: {
        latitude?: string;
        longitude?: string;
      };
      timezone?: string;
    }>;
  };
};

