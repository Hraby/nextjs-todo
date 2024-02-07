import { CircularProgress } from "@nextui-org/progress";

export function ProgressCircle({ totalTasks, completedTasks }: {totalTasks: number, completedTasks: number}) {
    const value = completedTasks/totalTasks*100
  
    return (
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={value}
        color="secondary"
        showValueLabel={true}
      />
    );
  }