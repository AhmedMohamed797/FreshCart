export function calcLeftTime(targetDate) {
  if (!targetDate) targetDate = new Date().setHours(23, 59, 59, 999);

  const ONE_HOUR_MS = 60 * 60 * 1000;
  const ONE_MINUTE_MS = 60 * 1000;
  const ONE_SECOND_MS = 1000;

  const leftTime = targetDate - new Date().getTime();

  if (leftTime > 0) {
    const hours = Math.trunc(leftTime / ONE_HOUR_MS);
    const minutes = Math.trunc((leftTime % ONE_HOUR_MS) / ONE_MINUTE_MS);
    const seconds = Math.trunc(
      ((leftTime % ONE_HOUR_MS) % ONE_MINUTE_MS) / ONE_SECOND_MS,
    );
    return { hours, minutes, seconds };
  } else {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
}
