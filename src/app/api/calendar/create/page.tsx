export type Attachment = {};
const calendarAttachment = (attachments: Attachment[]) => {};
const setAttendee = () => {
  return `\nATTENDEE;${delegateAttendance("mailto:jsmith@example.com")}:${calendarUserType()}:${setEmailLink("jdoe@example.com")}`;
};
const setDelegatees = (delegatees: string[]) =>
  `DELEGATED-TO="${delegatees.join(",")}"`;
const delegateAttendance = (email: string) => `DELEGATED-FROM="${email}"`;
const setEmailLink = (email: string) => `mailto:${email}`;
const calendarUserType = () => {
  const userType = ["INDIVIDUAL", "GROUP", "RESOURCE", "ROOM", "UNKNOWN"];
  return `CUTYPE=${userType[0]}`;
};
const CreateICalendar = () => {
  return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//NONSGML v1.0//EN
BEGIN:VEVENT
UID:1234567890@example.com
DTSTAMP:20240722T120000Z
DTSTART:20240722T130000Z
DTEND:20240722T140000Z
SUMMARY:Sample Event
DESCRIPTION:This is a sample event.
LOCATION:123 Sample St, Sample City, SC
END:VEVENT
END:VCALENDAR


`;
};
export default CreateICalendar;
