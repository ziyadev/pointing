import { AttendanceRepository } from './attendance.repository';
import { AttendancesDurationRepository } from './attendances-duration.repository';

// import all the repositories here and import them in the module
// so that dependency injection can work properly
export const repositories = [
  AttendanceRepository,
  AttendancesDurationRepository,
];
