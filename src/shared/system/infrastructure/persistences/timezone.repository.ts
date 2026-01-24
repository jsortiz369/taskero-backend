import { BadRequestException } from '@nestjs/common';
import { ITimezoneRepository } from '../../domain/repositories';

export class TimezoneRepository implements ITimezoneRepository {
  /**
   * @description Convert to UTC
   * @date 2026-01-23 12:37:30
   * @author Jogan Ortiz Muñoz
   *
   * @param {Date} date
   * @param {?string} [timezone]
   * @returns {Date}
   */
  convertToUtc(date: Date, timezone?: string): Date {
    const offset = this.validateIanaTimezone(timezone);
    const sign = offset.startsWith('-') ? -1 : 1;
    const [hours, minutes] = offset.slice(1).split(':').map(Number);

    const totalMinutes = sign * (hours * 60 + (minutes || 0));
    const localMillis = date.getTime() - totalMinutes * 60 * 1000;
    return new Date(localMillis);
  }

  private validateIanaTimezone(timezone?: string): string {
    try {
      if (!timezone) return '+00:00';

      const formar = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'shortOffset' });
      const timezoneName = formar.formatToParts(new Date()).find((p) => p.type === 'timeZoneName')?.value;
      console.log(timezoneName);
      return timezone;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Invalid timezone');
    }
  }
}
