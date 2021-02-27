export interface DashboardStats {
  overall: {
    inProgress: number;
    finished: number;
  }

  assigned: {
    inProgress: number;
    finished: number;
  }

  orders: {
    drafts: number;
    notStarted: number;
  }
}
