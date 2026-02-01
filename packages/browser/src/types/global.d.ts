interface Navigator {
  connection: {
    effectiveType?: string;
    rtt?: number;
    downlink?: number;
    addEventListener?: (type: string, listener: () => void) => void;
  };
}