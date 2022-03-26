package com.tts.web.nms.utility;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.util.SystemOutLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.tts.web.nms.dao.HolidaylistHome;
import com.tts.web.nms.dao.SladivisionlevelHome;
import com.tts.web.nms.dao.SlaendtoendHome;
import com.tts.web.nms.dao.SlatasklevelHome;
import com.tts.web.nms.dao.TickethopsHome;
import com.tts.web.nms.dao.UsergroupHome;
import com.tts.web.nms.model.Holidaylist;
import com.tts.web.nms.model.Sladivisionlevel;
import com.tts.web.nms.model.Slaendtoend;
import com.tts.web.nms.model.Slatasklevel;
import com.tts.web.nms.model.Tickethops;
import com.tts.web.nms.model.Usergroup;
import com.tts.web.nms.wrapper.LandingPageWrapper;

@Component("sla")
@Transactional
public class SLA {

	public HashMap<String, String> hashMapHolidayDateList = new HashMap<String, String>();
	public Calendar calendar = Calendar.getInstance();
	@Autowired
	public HolidaylistHome holidaylistHome;
	@Autowired
	public TickethopsHome tickethopsHome;
	@Autowired
	private SlatasklevelHome slatasklevelDao;
	@Autowired
	private SladivisionlevelHome sladivisionlevelDao;
	@Autowired
	private SlaendtoendHome slaendtoendDao;
	@Autowired
	private UsergroupHome usergroupHome;

	// public void main(String[] args) throws Exception {
	// getSlaDate(36, "non-flat");

	// }
	Logger applicationLog = Logger.getLogger("ApplicationLog");
	@PersistenceContext
	private EntityManager entityManager;

	public Date getSlaDate(int slaHour, String flag) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss a");
		DateFormat shortDateFormat = new SimpleDateFormat("yyyy/MM/dd");
		
		Date fromDate = new Date();
		
//		try {
//			fromDate = dateFormat.parse("2016/12/22 02:43:00 PM");
//		} catch (ParseException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}

		// Date toDate = null;
		// cal.setTime(d1);
		if (flag.equalsIgnoreCase("Non-Flat")) {
			try {

				// Checking if the fromDate is Public Holiday, Friday, Saturday
				// if isFromdateholiday == 0 then fromDate is not any holiday
				int isFromdateholiday = calculateWeekendsAndPublicHolidaysBetweenDates(fromDate, fromDate);

				int timeLeftFromBusinessHourInSecond = 0;

				// Divide SLA Hours by Working hours. Multiply the result
				// with
				// 24 hours
				// Multiply with 60 * 60 to convert it to SECOND
				int businessHour = 9;

				String businessHourStart = " 08:00:00 AM";
				String businessHourEnd = " 05:00:00 PM";

				double divideSlaHourByWorkingHour;
				double divideSlaHourByWorkingHourInSecond;

				Calendar slaStartCal = null;
				Date slaStartDate;

				// *******************

				Calendar calReturnDateFromSecond = null;

				// fromDate is not holiday
				if (isFromdateholiday == 0) {

					//fromDate = dateFormat.parse("2016/12/16 07:43:00 PM");
					// toDate = 2016/05/17 09:00:00 AM
					// fromDate = dateFormat.parse("2016/05/19 03:00:00 PM");
					// toDate = 2016/05/23 09:00:00 AM
					// fromDate = dateFormat.parse("2016/05/18 03:00:00 PM");
					// toDate = 2016/05/22 09:00:00 AM
					// fromDate = dateFormat.parse("2016/05/16 03:07:47 PM");
					// toDate = 2016/05/22 03:07:47 PM
					// fromDate = dateFormat.parse("2016/05/15 03:07:47 PM");
					// toDate = 2016/05/16 12:07:47 PM
					// fromDate = dateFormat.parse("2016/07/01 09:27:00 PM");
					// toDate = 2016/07/05 03:00:00 PM
					// fromDate = dateFormat.parse("2016/07/01 09:27:00 AM");
					// toDate = 2016/07/05 03:00:00 PM

					String d1 = shortDateFormat.format(fromDate);
					String t = d1 + businessHourEnd;
					Date businessHourEndDate = dateFormat.parse(t);

					timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate, fromDate);

					// If No business hour left today
					if (timeLeftFromBusinessHourInSecond <= 0) {

						// Add 1 day with fromDate
						slaStartCal = ReturnDateByAddingSecondFromDate(fromDate, 1 * 24 * 60 * 60);

						d1 = shortDateFormat.format(slaStartCal.getTime());
						t = d1 + businessHourStart;
						slaStartDate = dateFormat.parse(t);

						divideSlaHourByWorkingHour = slaHour / businessHour;
						divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

						calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(slaStartDate,
								(int) divideSlaHourByWorkingHourInSecond);

						// System.out.println("SLA Date after
						// divideSlaHourByWorkingHourInSecond : " +
						// dateFormat.format(calReturnDateFromSecond.getTime()));

						int remaining = 0;

						Calendar calAfterMod = null;
						if (slaHour % businessHour != 0) {
							remaining = slaHour % businessHour;
							remaining = remaining * 60 * 60; // convert hour to
																// second

							d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
							t = d1 + businessHourEnd;
							businessHourEndDate = dateFormat.parse(t);

							t = d1 + businessHourStart;
							Date businessHourStartDate = dateFormat.parse(t);

							timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate,
									calReturnDateFromSecond.getTime());

							if (timeLeftFromBusinessHourInSecond > 0) {
								if (remaining > timeLeftFromBusinessHourInSecond) {
									int minus = remaining - timeLeftFromBusinessHourInSecond;
									// Add 1 day to go to next day
									calReturnDateFromSecond.add(Calendar.DATE, 1);
									//
									d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
									t = d1 + businessHourStart;
									businessHourStartDate = dateFormat.parse(t);
									//
									calReturnDateFromSecond.setTime(businessHourStartDate);
									calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
											minus);
								} else if (remaining <= timeLeftFromBusinessHourInSecond) {
									calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
											remaining);
								}
								calReturnDateFromSecond = calAfterMod;
								System.out.println("SLA Date after mod divideSlaHourByWorkingHourInSecond : "
										+ dateFormat.format(calReturnDateFromSecond.getTime()));
							}
						}

						// If business hour left today
					} else {
						divideSlaHourByWorkingHour = slaHour / businessHour;
						divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

						calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(fromDate,
								(int) divideSlaHourByWorkingHourInSecond);

						// System.out.println("SLA Date after
						// divideSlaHourByWorkingHourInSecond : " +
						// dateFormat.format(calReturnDateFromSecond.getTime()));

						int remaining = 0;

						Calendar calAfterMod = null;
						if (slaHour % businessHour != 0) {
							remaining = slaHour % businessHour;
							remaining = remaining * 60 * 60; // convert hour to
																// second

							d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
							t = d1 + businessHourEnd;
							businessHourEndDate = dateFormat.parse(t);

							t = d1 + businessHourStart;
							Date businessHourStartDate = dateFormat.parse(t);

							timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate,
									calReturnDateFromSecond.getTime());

							if (remaining > timeLeftFromBusinessHourInSecond) {
								int minus = remaining - timeLeftFromBusinessHourInSecond;
								// Add 1 day to go to next day
								calReturnDateFromSecond.add(Calendar.DATE, 1);
								//
								d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
								t = d1 + businessHourStart;
								businessHourStartDate = dateFormat.parse(t);
								//
								calReturnDateFromSecond.setTime(businessHourStartDate);
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										minus);
							} else if (remaining <= timeLeftFromBusinessHourInSecond) {
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										remaining);
							}
							calReturnDateFromSecond = calAfterMod;
							System.out.println("SLA Date after mod divideSlaHourByWorkingHourInSecond : "
									+ dateFormat.format(calReturnDateFromSecond.getTime()));

						}

					}
				} else {

					String d1 = shortDateFormat.format(fromDate);
					String t = d1 + businessHourEnd;
					Date businessHourEndDate = dateFormat.parse(t);

					// Add 1 day with fromDate
					// slaStartCal = ReturnDateByAddingSecondFromDate(fromDate,
					// 1 * 24 * 60 * 60);

					d1 = shortDateFormat.format(fromDate.getTime());
					t = d1 + businessHourStart;
					slaStartDate = dateFormat.parse(t);

					divideSlaHourByWorkingHour = slaHour / businessHour;
					divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

					calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(slaStartDate,
							(int) divideSlaHourByWorkingHourInSecond);

					String s = dateFormat.format(calReturnDateFromSecond.getTime());
					
					System.out.println("SLA Date after divideSlaHourByWorkingHourInSecond : " + dateFormat.format(calReturnDateFromSecond.getTime()));

					int remaining = 0;

					Calendar calAfterMod = null;
					if (slaHour % businessHour != 0) {
						remaining = slaHour % businessHour;
						remaining = remaining * 60 * 60; // convert hour to
															// second

						d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
						t = d1 + businessHourEnd;
						businessHourEndDate = dateFormat.parse(t);

						t = d1 + businessHourStart;
						Date businessHourStartDate = dateFormat.parse(t);

						timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate,
								calReturnDateFromSecond.getTime());

						if (timeLeftFromBusinessHourInSecond > 0) {
							if (remaining > timeLeftFromBusinessHourInSecond) {
								int minus = remaining - timeLeftFromBusinessHourInSecond;
								// Add 1 day to go to next day
								calReturnDateFromSecond.add(Calendar.DATE, 1);
								//
								d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
								t = d1 + businessHourStart;
								businessHourStartDate = dateFormat.parse(t);
								//
								calReturnDateFromSecond.setTime(businessHourStartDate);
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										minus);
							} else if (remaining <= timeLeftFromBusinessHourInSecond) {
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										remaining);
							}
							calReturnDateFromSecond = calAfterMod;
							System.out.println("SLA Date after mod divideSlaHourByWorkingHourInSecond : "
									+ dateFormat.format(calReturnDateFromSecond.getTime()));
						}
					}

				}

				// *******************

				recurssive(fromDate, calReturnDateFromSecond.getTime());

				System.out.println("Service Request Date : " + dateFormat.format(fromDate));
				System.out.println("Final SLA Date : " + dateFormat.format(calendar.getTime()));

				// By Shakil
				// Date : 23-12-2016
				// This below part is for showing SLA End Date @ 5:00 PM if it goes to next day 8:00 AM
				
				String test = dateFormat.format(calendar.getTime()).toString();
				
				if(test.contains("08:00:00 AM"))
				{
					Calendar calFinal = calendar;
					
					calFinal.add(Calendar.DATE, -1);
					
					String d1 = shortDateFormat.format(calFinal.getTime());
					String t = d1 + businessHourEnd;
					Date businessHourEndDate = dateFormat.parse(t);				

					System.out.println(t);
					
					calendar.setTime(businessHourEndDate);
					
					String s = dateFormat.format(calendar.getTime());
					
					System.out.println("Final SLA Date : " + dateFormat.format(calendar.getTime()));					
				}
				
				

			} catch (Exception ex) {
				ex.printStackTrace();
				Logger.getLogger(SLA.class.getName()).log(Level.SEVERE, null, ex);
				applicationLog.info("SLA:Sla Date,Non-Flat " + ex.getMessage());
			}
		}

		else if (flag.equalsIgnoreCase("Flat")) {
			try {

				// Divide SLA Hours by Working hours. Multiply the result with
				// 24 hours
				// Multiply with 60 * 60 to convert it to SECOND
				double businessHour = 24.0;
				double divideSlaHourByWorkingHour = ((double) slaHour) / businessHour;

				double divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

				Calendar calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(fromDate,
						(int) divideSlaHourByWorkingHourInSecond);

				calendar = calReturnDateFromSecond;

				System.out.println("Service Request Date : " + dateFormat.format(fromDate));
				System.out.println("Final SLA Date : " + dateFormat.format(calendar.getTime()));

			} catch (Exception ex) {
				ex.printStackTrace();
				Logger.getLogger(SLA.class.getName()).log(Level.SEVERE, null, ex);
				applicationLog.info("SLA:Sla Date,Flat " + ex.getMessage() + "date and time: " + new Date()
						+ " successfully has logged in.");
			}
		}

		String strSlaDate = dateFormat.format(calendar.getTime());
		Date slaDateToReturn = null;
		try {
			slaDateToReturn = dateFormat.parse(strSlaDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return slaDateToReturn;
	}

	public Date getSlaDate(int slaHour, Date activityDate, String flag) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss a");
		DateFormat shortDateFormat = new SimpleDateFormat("yyyy/MM/dd");
		Date fromDate = activityDate;

		// Date toDate = null;
		// cal.setTime(d1);
		if (flag.equalsIgnoreCase("Non-Flat")) {
			try {

				// Checking if the fromDate is Public Holiday, Friday, Saturday
				// if isFromdateholiday == 0 then fromDate is not any holiday
				int isFromdateholiday = calculateWeekendsAndPublicHolidaysBetweenDates(fromDate, fromDate);

				int timeLeftFromBusinessHourInSecond = 0;

				// Divide SLA Hours by Working hours. Multiply the result
				// with
				// 24 hours
				// Multiply with 60 * 60 to convert it to SECOND
				int businessHour = 9;

				String businessHourStart = " 08:00:00 AM";
				String businessHourEnd = " 05:00:00 PM";

				double divideSlaHourByWorkingHour;
				double divideSlaHourByWorkingHourInSecond;

				Calendar slaStartCal = null;
				Date slaStartDate;

				// *******************

				Calendar calReturnDateFromSecond = null;

				// fromDate is not holiday
				if (isFromdateholiday == 0) {

					// fromDate = dateFormat.parse("2016/05/15 03:00:00 PM");
					// toDate = 2016/05/17 09:00:00 AM
					// fromDate = dateFormat.parse("2016/05/19 03:00:00 PM");
					// toDate = 2016/05/23 09:00:00 AM
					// fromDate = dateFormat.parse("2016/05/18 03:00:00 PM");
					// toDate = 2016/05/22 09:00:00 AM
					// fromDate = dateFormat.parse("2016/05/16 03:07:47 PM");
					// toDate = 2016/05/22 03:07:47 PM
					// fromDate = dateFormat.parse("2016/05/15 03:07:47 PM");
					// toDate = 2016/05/16 12:07:47 PM
					// fromDate = dateFormat.parse("2016/07/01 09:27:00 PM");
					// toDate = 2016/07/05 03:00:00 PM
					// fromDate = dateFormat.parse("2016/07/01 09:27:00 AM");
					// toDate = 2016/07/05 03:00:00 PM

					String d1 = shortDateFormat.format(fromDate);
					String t = d1 + businessHourEnd;
					Date businessHourEndDate = dateFormat.parse(t);

					timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate, fromDate);

					// If No business hour left today
					if (timeLeftFromBusinessHourInSecond <= 0) {

						// Add 1 day with fromDate
						slaStartCal = ReturnDateByAddingSecondFromDate(fromDate, 1 * 24 * 60 * 60);

						d1 = shortDateFormat.format(slaStartCal.getTime());
						t = d1 + businessHourStart;
						slaStartDate = dateFormat.parse(t);

						divideSlaHourByWorkingHour = slaHour / businessHour;
						divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

						calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(slaStartDate,
								(int) divideSlaHourByWorkingHourInSecond);

						// System.out.println("SLA Date after
						// divideSlaHourByWorkingHourInSecond : " +
						// dateFormat.format(calReturnDateFromSecond.getTime()));

						int remaining = 0;

						Calendar calAfterMod = null;
						if (slaHour % businessHour != 0) {
							remaining = slaHour % businessHour;
							remaining = remaining * 60 * 60; // convert hour to
																// second

							d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
							t = d1 + businessHourEnd;
							businessHourEndDate = dateFormat.parse(t);

							t = d1 + businessHourStart;
							Date businessHourStartDate = dateFormat.parse(t);

							timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate,
									calReturnDateFromSecond.getTime());

							if (timeLeftFromBusinessHourInSecond > 0) {
								if (remaining > timeLeftFromBusinessHourInSecond) {
									int minus = remaining - timeLeftFromBusinessHourInSecond;
									// Add 1 day to go to next day
									calReturnDateFromSecond.add(Calendar.DATE, 1);
									//
									d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
									t = d1 + businessHourStart;
									businessHourStartDate = dateFormat.parse(t);
									//
									calReturnDateFromSecond.setTime(businessHourStartDate);
									calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
											minus);
								} else if (remaining <= timeLeftFromBusinessHourInSecond) {
									calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
											remaining);
								}
								calReturnDateFromSecond = calAfterMod;
								System.out.println("SLA Date after mod divideSlaHourByWorkingHourInSecond : "
										+ dateFormat.format(calReturnDateFromSecond.getTime()));
							}
						}

						// If business hour left today
					} else {
						divideSlaHourByWorkingHour = slaHour / businessHour;
						divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

						calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(fromDate,
								(int) divideSlaHourByWorkingHourInSecond);

						// System.out.println("SLA Date after
						// divideSlaHourByWorkingHourInSecond : " +
						// dateFormat.format(calReturnDateFromSecond.getTime()));

						int remaining = 0;

						Calendar calAfterMod = null;
						if (slaHour % businessHour != 0) {
							remaining = slaHour % businessHour;
							remaining = remaining * 60 * 60; // convert hour to
																// second

							d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
							t = d1 + businessHourEnd;
							businessHourEndDate = dateFormat.parse(t);

							t = d1 + businessHourStart;
							Date businessHourStartDate = dateFormat.parse(t);

							timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate,
									calReturnDateFromSecond.getTime());

							if (remaining > timeLeftFromBusinessHourInSecond) {
								int minus = remaining - timeLeftFromBusinessHourInSecond;
								// Add 1 day to go to next day
								calReturnDateFromSecond.add(Calendar.DATE, 1);
								//
								d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
								t = d1 + businessHourStart;
								businessHourStartDate = dateFormat.parse(t);
								//
								calReturnDateFromSecond.setTime(businessHourStartDate);
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										minus);
							} else if (remaining <= timeLeftFromBusinessHourInSecond) {
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										remaining);
							}
							calReturnDateFromSecond = calAfterMod;
							System.out.println("SLA Date after mod divideSlaHourByWorkingHourInSecond : "
									+ dateFormat.format(calReturnDateFromSecond.getTime()));

						}

					}
				} else {

					String d1 = shortDateFormat.format(fromDate);
					String t = d1 + businessHourEnd;
					Date businessHourEndDate = dateFormat.parse(t);

					// Add 1 day with fromDate
					// slaStartCal = ReturnDateByAddingSecondFromDate(fromDate,
					// 1 * 24 * 60 * 60);

					d1 = shortDateFormat.format(fromDate.getTime());
					t = d1 + businessHourStart;
					slaStartDate = dateFormat.parse(t);

					divideSlaHourByWorkingHour = slaHour / businessHour;
					divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

					calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(slaStartDate,
							(int) divideSlaHourByWorkingHourInSecond);

					// System.out.println("SLA Date after
					// divideSlaHourByWorkingHourInSecond : " +
					// dateFormat.format(calReturnDateFromSecond.getTime()));

					int remaining = 0;

					Calendar calAfterMod = null;
					if (slaHour % businessHour != 0) {
						remaining = slaHour % businessHour;
						remaining = remaining * 60 * 60; // convert hour to
															// second

						d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
						t = d1 + businessHourEnd;
						businessHourEndDate = dateFormat.parse(t);

						t = d1 + businessHourStart;
						Date businessHourStartDate = dateFormat.parse(t);

						timeLeftFromBusinessHourInSecond = calculateTimeDifferenceInSecond(businessHourEndDate,
								calReturnDateFromSecond.getTime());

						if (timeLeftFromBusinessHourInSecond > 0) {
							if (remaining > timeLeftFromBusinessHourInSecond) {
								int minus = remaining - timeLeftFromBusinessHourInSecond;
								// Add 1 day to go to next day
								calReturnDateFromSecond.add(Calendar.DATE, 1);
								//
								d1 = shortDateFormat.format(calReturnDateFromSecond.getTime());
								t = d1 + businessHourStart;
								businessHourStartDate = dateFormat.parse(t);
								//
								calReturnDateFromSecond.setTime(businessHourStartDate);
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										minus);
							} else if (remaining <= timeLeftFromBusinessHourInSecond) {
								calAfterMod = ReturnDateByAddingSecondFromDate(calReturnDateFromSecond.getTime(),
										remaining);
							}
							calReturnDateFromSecond = calAfterMod;
							System.out.println("SLA Date after mod divideSlaHourByWorkingHourInSecond : "
									+ dateFormat.format(calReturnDateFromSecond.getTime()));
						}
					}

				}

				// *******************

				recurssive(fromDate, calReturnDateFromSecond.getTime());

				System.out.println("Service Request Date : " + dateFormat.format(fromDate));
				System.out.println("Final SLA Date : " + dateFormat.format(calendar.getTime()));
				
				// By Shakil
				// Date : 23-12-2016
				// This below part is for showing SLA End Date @ 5:00 PM if it goes to next day 8:00 AM
				
				String test = dateFormat.format(calendar.getTime()).toString();
				
				if(test.contains("08:00:00 AM"))
				{
					Calendar calFinal = calendar;
					
					calFinal.add(Calendar.DATE, -1);
					
					String d1 = shortDateFormat.format(calFinal.getTime());
					String t = d1 + businessHourEnd;
					Date businessHourEndDate = dateFormat.parse(t);				

					System.out.println(t);
					
					calendar.setTime(businessHourEndDate);
					
					String s = dateFormat.format(calendar.getTime());
					
					System.out.println("Final SLA Date : " + dateFormat.format(calendar.getTime()));					
				}				

			} catch (Exception ex) {
				ex.printStackTrace();
				Logger.getLogger(SLA.class.getName()).log(Level.SEVERE, null, ex);
				applicationLog.info("SLA:Sla Date,Non-Flat " + ex.getMessage());
			}
		}

		else if (flag.equalsIgnoreCase("Flat")) {
			try {

				// Divide SLA Hours by Working hours. Multiply the result with
				// 24 hours
				// Multiply with 60 * 60 to convert it to SECOND
				double businessHour = 24.0;
				double divideSlaHourByWorkingHour = ((double) slaHour) / businessHour;

				double divideSlaHourByWorkingHourInSecond = divideSlaHourByWorkingHour * 24 * 60 * 60;

				Calendar calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(fromDate,
						(int) divideSlaHourByWorkingHourInSecond);

				calendar = calReturnDateFromSecond;

				System.out.println("Service Request Date : " + dateFormat.format(fromDate));
				System.out.println("Final SLA Date : " + dateFormat.format(calendar.getTime()));

			} catch (Exception ex) {
				ex.printStackTrace();
				Logger.getLogger(SLA.class.getName()).log(Level.SEVERE, null, ex);
				applicationLog.info("SLA:Sla Date,Flat " + ex.getMessage() + "date and time: " + new Date()
						+ " successfully has logged in.");
			}
		}

		String strSlaDate = dateFormat.format(calendar.getTime());
		Date slaDateToReturn = null;
		try {
			slaDateToReturn = dateFormat.parse(strSlaDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return slaDateToReturn;
	}

	// Don't delete
	public Date getSlaDate(String slaWDandDayForSocE2eSla) {
		// WD = Non-Flat
		// D = Flat
		// WK = Flat

//		slaWDandDayForSocE2eSla = "6 WD and 0.89 D";
//		slaWDandDayForSocE2eSla = "10 WD";
//		slaWDandDayForSocE2eSla = "11 WD";
//		slaWDandDayForSocE2eSla = "13 WD";
//		slaWDandDayForSocE2eSla = "18.5 WD";
//		slaWDandDayForSocE2eSla = "3.25 WD";
//		slaWDandDayForSocE2eSla = "3.33 D";
//		slaWDandDayForSocE2eSla = "5.33 D";
//		slaWDandDayForSocE2eSla = "7 WD";
//		slaWDandDayForSocE2eSla = "9 WD and 0.5 D";
//		slaWDandDayForSocE2eSla = "13.5 WD and 0.5 D";
//		slaWDandDayForSocE2eSla = "6 WD and 0.5 D";
//		slaWDandDayForSocE2eSla = "4 WK and 1 WD";
//		slaWDandDayForSocE2eSla = "5 WK and 1 WD";
//		slaWDandDayForSocE2eSla = "2 WK and 1.33 D";
//		slaWDandDayForSocE2eSla = "3 WK and 1 WD";

		
		
		String[] WkWdPart; // 6 WD or 3 WK
		String[] DPart; // 1.33 D or 1 WD

		String WkWdPart_Flat_NonFlat_Status = "";
		String DPart_Flat_NonFlat_Status = "";
		
		Date getDateNonFlat;

		Date getFinalDate = new Date();
		
		int WkWdPart_Ultimate_Result = 0;

		double WkWdPart_WDInHour;
		double WkWdPart_WD;

		double WkWdPart_WKInHour;
		double WkWdPart_WK;

		double WkWdPart_DInHour;
		double WkWdPart_D;

		int DPart_Ultimate_Result = 0;

		double DPart_WDInHour;
		double DPart_WD;

		double DPart_WKInHour;
		double DPart_WK;

		double DPart_DInHour;
		double DPart_D;

		try {

			if (slaWDandDayForSocE2eSla.contains("and")) {
				
				String[] s = slaWDandDayForSocE2eSla.split("and");

				WkWdPart = s[0].trim().split(" "); // 6 WD or 3 WK
				DPart = s[1].trim().split(" "); // 1.33 D or 1 WD

				// WkWdPart
				if (WkWdPart[1].contains("WD")) {
					WkWdPart_WD = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WDInHour = WkWdPart_WD * 9;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WDInHour);
					WkWdPart_Flat_NonFlat_Status = "Non-Flat";
				} else if (WkWdPart[1].contains("WK")) {
					WkWdPart_WK = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WKInHour = WkWdPart_WK * 7 * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WKInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				} else if (WkWdPart[1].contains("D")) {
					WkWdPart_D = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_DInHour = WkWdPart_D * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_DInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				}

				// DPart
				if (DPart[1].contains("WD")) {
					DPart_WD = Double.parseDouble(DPart[0].trim());
					DPart_WDInHour = DPart_WD * 9;
					DPart_Ultimate_Result = (int) Math.round(DPart_WDInHour);
					DPart_Flat_NonFlat_Status = "Non-Flat";
				} else if (DPart[1].contains("WK")) {
					DPart_WK = Double.parseDouble(DPart[0].trim());
					DPart_WKInHour = DPart_WK * 7 * 24;
					DPart_Ultimate_Result = (int) Math.round(DPart_WKInHour);
					DPart_Flat_NonFlat_Status = "Flat";
				} else if (DPart[1].contains("D")) {
					DPart_D = Double.parseDouble(DPart[0].trim());
					DPart_DInHour = DPart_D * 24;
					DPart_Ultimate_Result = (int) Math.round(DPart_DInHour);
					DPart_Flat_NonFlat_Status = "Flat";
				}

				if (WkWdPart_Flat_NonFlat_Status.equals("Non-Flat")) {
					// Calculation Non-Flat SLA
					getDateNonFlat = getSlaDate(WkWdPart_Ultimate_Result, "Non-Flat");

					// Calculation Flat SLA
					getFinalDate = getSlaDate(DPart_Ultimate_Result, getDateNonFlat, "Flat");
					
				} else if (DPart_Flat_NonFlat_Status.equals("Non-Flat")) {
					// Calculation Non-Flat SLA
					getDateNonFlat = getSlaDate(DPart_Ultimate_Result, "Non-Flat");

					// Calculation Flat SLA
					getFinalDate = getSlaDate(WkWdPart_Ultimate_Result, getDateNonFlat, "Flat");
					
				} else {
					int totalFlatSlaHour = WkWdPart_Ultimate_Result + DPart_Ultimate_Result;
					// Calculation Flat SLA
					getFinalDate = getSlaDate(totalFlatSlaHour, "Flat");
				}

			} else {
				
				WkWdPart = slaWDandDayForSocE2eSla.split(" "); // 1.33 D

				// WkWdPart
				if (WkWdPart[1].contains("WD")) {
					WkWdPart_WD = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WDInHour = WkWdPart_WD * 9;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WDInHour);
					WkWdPart_Flat_NonFlat_Status = "Non-Flat";
				} else if (WkWdPart[1].contains("WK")) {
					WkWdPart_WK = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WKInHour = WkWdPart_WK * 7 * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WKInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				} else if (WkWdPart[1].contains("D")) {
					WkWdPart_D = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_DInHour = WkWdPart_D * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_DInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				}

				if (WkWdPart_Flat_NonFlat_Status.equals("Non-Flat")) {
					// Calculation Non-Flat SLA
					getFinalDate = getSlaDate(WkWdPart_Ultimate_Result, "Non-Flat");
					
				} else {
					// Calculation Flat SLA
					getFinalDate = getSlaDate(WkWdPart_Ultimate_Result, "Flat");
				}				

			}

			return getFinalDate;
			
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}

	}

	public Date getSlaDate(String slaWDandDayForSocE2eSla, Date activityDate) {
		// WD = Non-Flat
		// D = Flat
		// WK = Flat

//		slaWDandDayForSocE2eSla = "6 WD and 0.89 D";
//		slaWDandDayForSocE2eSla = "10 WD";
//		slaWDandDayForSocE2eSla = "11 WD";
//		slaWDandDayForSocE2eSla = "13 WD";
//		slaWDandDayForSocE2eSla = "18.5 WD";
//		slaWDandDayForSocE2eSla = "3.25 WD";
//		slaWDandDayForSocE2eSla = "3.33 D";
//		slaWDandDayForSocE2eSla = "5.33 D";
//		slaWDandDayForSocE2eSla = "7 WD";
//		slaWDandDayForSocE2eSla = "9 WD and 0.5 D";
//		slaWDandDayForSocE2eSla = "13.5 WD and 0.5 D";
//		slaWDandDayForSocE2eSla = "6 WD and 0.5 D";
//		slaWDandDayForSocE2eSla = "4 WK and 1 WD";
//		slaWDandDayForSocE2eSla = "5 WK and 1 WD";
//		slaWDandDayForSocE2eSla = "2 WK and 1.33 D";
//		slaWDandDayForSocE2eSla = "3 WK and 1 WD";

		
		
		String[] WkWdPart; // 6 WD or 3 WK
		String[] DPart; // 1.33 D or 1 WD

		String WkWdPart_Flat_NonFlat_Status = "";
		String DPart_Flat_NonFlat_Status = "";
		
		Date getDateNonFlat;

		Date getFinalDate = new Date();
		
		int WkWdPart_Ultimate_Result = 0;

		double WkWdPart_WDInHour;
		double WkWdPart_WD;

		double WkWdPart_WKInHour;
		double WkWdPart_WK;

		double WkWdPart_DInHour;
		double WkWdPart_D;

		int DPart_Ultimate_Result = 0;

		double DPart_WDInHour;
		double DPart_WD;

		double DPart_WKInHour;
		double DPart_WK;

		double DPart_DInHour;
		double DPart_D;

		try {

			if (slaWDandDayForSocE2eSla.contains("and")) {
				
				String[] s = slaWDandDayForSocE2eSla.split("and");

				WkWdPart = s[0].trim().split(" "); // 6 WD or 3 WK
				DPart = s[1].trim().split(" "); // 1.33 D or 1 WD

				// WkWdPart
				if (WkWdPart[1].contains("WD")) {
					WkWdPart_WD = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WDInHour = WkWdPart_WD * 9;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WDInHour);
					WkWdPart_Flat_NonFlat_Status = "Non-Flat";
				} else if (WkWdPart[1].contains("WK")) {
					WkWdPart_WK = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WKInHour = WkWdPart_WK * 7 * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WKInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				} else if (WkWdPart[1].contains("D")) {
					WkWdPart_D = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_DInHour = WkWdPart_D * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_DInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				}

				// DPart
				if (DPart[1].contains("WD")) {
					DPart_WD = Double.parseDouble(DPart[0].trim());
					DPart_WDInHour = DPart_WD * 9;
					DPart_Ultimate_Result = (int) Math.round(DPart_WDInHour);
					DPart_Flat_NonFlat_Status = "Non-Flat";
				} else if (DPart[1].contains("WK")) {
					DPart_WK = Double.parseDouble(DPart[0].trim());
					DPart_WKInHour = DPart_WK * 7 * 24;
					DPart_Ultimate_Result = (int) Math.round(DPart_WKInHour);
					DPart_Flat_NonFlat_Status = "Flat";
				} else if (DPart[1].contains("D")) {
					DPart_D = Double.parseDouble(DPart[0].trim());
					DPart_DInHour = DPart_D * 24;
					DPart_Ultimate_Result = (int) Math.round(DPart_DInHour);
					DPart_Flat_NonFlat_Status = "Flat";
				}

				if (WkWdPart_Flat_NonFlat_Status.equals("Non-Flat")) {
					// Calculation Non-Flat SLA
					getDateNonFlat = getSlaDate(WkWdPart_Ultimate_Result, activityDate, "Non-Flat");

					// Calculation Flat SLA
					getFinalDate = getSlaDate(DPart_Ultimate_Result, getDateNonFlat, "Flat");
					
				} else if (DPart_Flat_NonFlat_Status.equals("Non-Flat")) {
					// Calculation Non-Flat SLA
					getDateNonFlat = getSlaDate(DPart_Ultimate_Result, activityDate, "Non-Flat");

					// Calculation Flat SLA
					getFinalDate = getSlaDate(WkWdPart_Ultimate_Result, getDateNonFlat, "Flat");
					
				} else {
					int totalFlatSlaHour = WkWdPart_Ultimate_Result + DPart_Ultimate_Result;
					// Calculation Flat SLA
					getFinalDate = getSlaDate(totalFlatSlaHour, activityDate, "Flat");
				}

			} else {
				
				WkWdPart = slaWDandDayForSocE2eSla.split(" "); // 1.33 D

				// WkWdPart
				if (WkWdPart[1].contains("WD")) {
					WkWdPart_WD = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WDInHour = WkWdPart_WD * 9;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WDInHour);
					WkWdPart_Flat_NonFlat_Status = "Non-Flat";
				} else if (WkWdPart[1].contains("WK")) {
					WkWdPart_WK = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_WKInHour = WkWdPart_WK * 7 * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_WKInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				} else if (WkWdPart[1].contains("D")) {
					WkWdPart_D = Double.parseDouble(WkWdPart[0].trim());
					WkWdPart_DInHour = WkWdPart_D * 24;
					WkWdPart_Ultimate_Result = (int) Math.round(WkWdPart_DInHour);
					WkWdPart_Flat_NonFlat_Status = "Flat";
				}

				if (WkWdPart_Flat_NonFlat_Status.equals("Non-Flat")) {
					// Calculation Non-Flat SLA
					getFinalDate = getSlaDate(WkWdPart_Ultimate_Result, activityDate, "Non-Flat");
					
				} else {
					// Calculation Flat SLA
					getFinalDate = getSlaDate(WkWdPart_Ultimate_Result, activityDate, "Flat");
				}				

			}

			return getFinalDate;
			
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}

	}
	
	
	public void recurssive(Date fromDate, Date toDate) {
		try {
			int totalFridaysSaturdays = calculateWeekendsAndPublicHolidaysBetweenDates(fromDate, toDate);
			int convertHolidaysIntoSecond;
			int totalSlaInSecond = 0;
			calendar.setTime(toDate);
			if (totalFridaysSaturdays > 0) {
				convertHolidaysIntoSecond = totalFridaysSaturdays * 24 * 60 * 60;
				totalSlaInSecond = convertHolidaysIntoSecond;
				calendar = ReturnDateByAddingSecondFromDate(toDate, totalSlaInSecond);
				recurssive(calendar.getTime(), calendar.getTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Calendar recurssive_main(Date fromDate, Date toDate) {
		int totalFridaysSaturdays = calculateWeekendsAndPublicHolidaysBetweenDates(fromDate, toDate);
		int convertHolidaysIntoSecond;
		int totalSlaInSecond = 0;
		Calendar calReturnDateFromSecond;
		if (totalFridaysSaturdays > 0) {
			convertHolidaysIntoSecond = totalFridaysSaturdays * 24 * 60 * 60;
			totalSlaInSecond = convertHolidaysIntoSecond;
			calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(toDate, totalSlaInSecond);
			recurssive_main(toDate, calReturnDateFromSecond.getTime());
		}
		calReturnDateFromSecond = ReturnDateByAddingSecondFromDate(toDate, totalSlaInSecond);
		return calReturnDateFromSecond;
	}

	public Calendar ReturnDateByAddingSecondFromDate(Date fromDate, int slaInSecond) {
		Calendar calReturnDateFromSecond = Calendar.getInstance();
		calReturnDateFromSecond.setTime(fromDate);
		calReturnDateFromSecond.add(Calendar.SECOND, slaInSecond);
		// DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss
		// a");
		// System.out.println(dateFormat.format(cal.getTime()));
		return calReturnDateFromSecond;
	}

	public int calculateTimeDifferenceInSecond(Date greaterDate, Date smallerDate) {
		// in milliseconds
		long diff = greaterDate.getTime() - smallerDate.getTime();
		long diffSeconds = TimeUnit.MILLISECONDS.toSeconds(diff);
		// long diffSeconds = diff / 1000;
		return (int) diffSeconds;
	}

	@SuppressWarnings("finally")
	public int calculateWeekendsAndPublicHolidaysBetweenDates(Date fromDate, Date toDate) {

		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		int totalHolidays = 0;
		// long fridays = 0;
		// long satudays = 0;

		try {
			Calendar fromCalendar = Calendar.getInstance();
			fromCalendar.setTime(fromDate);

			// Add 1 day to exclude current day to be calculated in holiday.
			// The Holiday calculation should start from tomorrow
			// fromCalendar.add(Calendar.DATE, 1);

			Calendar toCalendar = Calendar.getInstance();
			toCalendar.setTime(toDate);

			String exist = "";

			// Calculate Friday & Saturday between 2 dates
			hashMapHolidayDateList.clear();
			while (toCalendar.after(fromCalendar)) {
				// ||
				// df.format(toCalendar.getTime()).equals(df.format(fromCalendar.getTime())))
				// {
				if (fromCalendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY) {
					// fridays++;
					exist = hashMapHolidayDateList.get(df.format(fromCalendar.getTime()));
					if (exist == "" || exist == null) {
						totalHolidays++;
						hashMapHolidayDateList.put(df.format(fromCalendar.getTime()), "FRIDAY");
					}
				} else if (fromCalendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
					// satudays++;
					exist = hashMapHolidayDateList.get(df.format(fromCalendar.getTime()));
					if (exist == "" || exist == null) {
						totalHolidays++;
						hashMapHolidayDateList.put(df.format(fromCalendar.getTime()), "SATURDAY");
					}
				}

				// *************** Check for Public Holidays
				try {
					DateFormat dbDateFormat = new SimpleDateFormat("yyyy-MM-dd"); // yyyy-MM-dd
					String s = dbDateFormat.format(fromCalendar.getTime());
					Date d = dbDateFormat.parse(s);
					Holidaylist holidayList = holidaylistHome.findByHolidayListByDate(d);
					if (holidayList != null) {
						if (hashMapHolidayDateList.get(df.format(fromCalendar.getTime())) != null) {
							String hashValue = hashMapHolidayDateList.get(df.format(fromCalendar.getTime()));
							// Concatnate old value & new value. So that if we
							// want
							// So that if we want, we can take report of the
							// list
							hashValue = hashValue + "_" + holidayList.getName();
							hashMapHolidayDateList.replace(df.format(fromCalendar.getTime()), hashValue);
						} else {
							totalHolidays++;
							hashMapHolidayDateList.put(df.format(fromCalendar.getTime()), holidayList.getName());
							System.out.println("Public Holiday : " + holidayList.getName());
						}
					}
				} catch (Exception ex) {
					ex.printStackTrace();
				}

				// Add 1 day to go to next day
				fromCalendar.add(Calendar.DATE, 1);
				// System.out.println("From calendar : " +
				// df.format(fromCalendar.getTime()));
				// System.out.println("To calendar : " +
				// df.format(toCalendar.getTime()));
			}

			if (fromCalendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY) {
				// fridays++;
				exist = hashMapHolidayDateList.get(df.format(fromCalendar.getTime()));
				if (exist == "" || exist == null) {
					totalHolidays++;
					totalHolidays++; // The addition for SATURDAY. As today is
										// FRIDAY. So the next day will also be
										// Holiday.
					hashMapHolidayDateList.put(df.format(fromCalendar.getTime()), "FRIDAY");
				}
			} else if (fromCalendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
				// satudays++;
				exist = hashMapHolidayDateList.get(df.format(fromCalendar.getTime()));
				if (exist == "" || exist == null) {
					totalHolidays++;
					hashMapHolidayDateList.put(df.format(fromCalendar.getTime()), "SATURDAY");
				}
			}

			// *************** Check for Public Holidays
			try {
				DateFormat dbDateFormat = new SimpleDateFormat("yyyy-MM-dd"); // yyyy-MM-dd
				String s = dbDateFormat.format(fromCalendar.getTime());
				Date d = dbDateFormat.parse(s);
				Holidaylist holidayList = holidaylistHome.findByHolidayListByDate(d);
				if (holidayList != null) {
					if (hashMapHolidayDateList.get(df.format(fromCalendar.getTime())) != null) {
						String hashValue = hashMapHolidayDateList.get(df.format(fromCalendar.getTime()));
						// Concatnate old value & new value. So that if we
						// want
						// So that if we want, we can take report of the
						// list
						hashValue = hashValue + "_" + holidayList.getName();
						hashMapHolidayDateList.replace(df.format(fromCalendar.getTime()), hashValue);
					} else {
						totalHolidays++;
						hashMapHolidayDateList.put(df.format(fromCalendar.getTime()), holidayList.getName());
						System.out.println("Public Holiday : " + holidayList.getName());
					}
				}
			} catch (Exception ex) {
				ex.printStackTrace();
			}

			System.out.println("Total Fridays, Saturdays & Public Holidays : " + totalHolidays);
			// System.out.println("Saturdays : " + satudays);
		} catch (Exception ex) {
			ex.printStackTrace();
			Logger.getLogger(SLA.class.getName()).log(Level.SEVERE, null, ex);
		} finally {
			return totalHolidays;
		}
	}
	
public void SLAManager() {
	tickethopsHome.updateTicketHopsForPreviousHop();
}  

	/*public void SLAManager() {

		try {
			
			 

			System.out.println("Inside SLA Manager");

			List<Tickethops> tickethopsList = tickethopsHome.findAllTickethopsByOpenHoldStatus();

			List<String> to = new ArrayList<>();
			List<String> cc = new ArrayList<>();
			List<String> bcc = new ArrayList<>();
			String subject = "";
			String body = "";
			String[] toList = null;
			String[] ccList = null;

			for (Tickethops tickethop : tickethopsList) {

				if (tickethop.getGroupSlastatus() == null || tickethop.getGroupSlastatus().equals("Alarming")) {

					try {
						int slaTimeLeft = calculateTimeDifferenceInSecond(tickethop.getGroupSladate(), new Date());

						System.out.println("slaTimeLeft : " + slaTimeLeft);

						// If value is negative or ZERO : SLA status = Fail
						if (slaTimeLeft <= 0) {
							tickethop = tickethopsHome.findByHopsId(tickethop.getTicketHopsId());
							tickethopsHome.updateSlaStatus(tickethop, "Fail");

							toList = tickethop.getUsergroupByNextUserGroupId().getEscalationEmailId().split(";");
							for (String toReceiver : toList) {
								to.add(toReceiver);
							}
							ccList = tickethop.getUsergroupByNextUserGroupId().getEmailId().split(";");
							for (String ccReciver : ccList) {
								cc.add(ccReciver);
							}
							subject = "SLA of Service Request # " + tickethop.getTicketNumber() + " is failed";
							body = "SLA of Service Request # " + tickethop.getTicketNumber() + " is failed";
							System.out
									.println("SLA of Service Request # " + tickethop.getTicketNumber() + " is failed");
							MailSender.getInstance().sendMail(to, cc, bcc, subject, body);
						} else {
							System.out.println("To sec : " + TimeUnit.HOURS.toSeconds(tickethop.getGroupSlainHour()));

							double timePassed = TimeUnit.HOURS.toSeconds(tickethop.getGroupSlainHour()) - slaTimeLeft;

							double slaTimeRemainingPercentage = (timePassed
									/ TimeUnit.HOURS.toSeconds(tickethop.getGroupSlainHour())) * 100;

							// double slaTimeRemainingPercentage = (slaTimeLeft
							// /
							// TimeUnit.MINUTES.toSeconds(tickethops.getGroupSlainHour()))
							// * 100;
							System.out.println("slaTimeRemainingPercentage : " + slaTimeRemainingPercentage);
							if (slaTimeRemainingPercentage >= 90 && slaTimeRemainingPercentage <= 100) {
								tickethop = tickethopsHome.findByHopsId(tickethop.getTicketHopsId());
								tickethopsHome.updateSlaStatus(tickethop, "Alarming");
								toList = tickethop.getUsergroupByNextUserGroupId().getEmailId().split(";");
								for (String toReceiver : toList) {
									to.add(toReceiver);
								}
								subject = "Service Request # " + tickethop.getTicketNumber()
										+ " is close to SLA violation";
								body = "Service Request # " + tickethop.getTicketNumber()
										+ " is close to SLA violation";
								System.out.println("Service Request # " + tickethop.getTicketNumber()
										+ " is close to SLA violation");
								MailSender.getInstance().sendMail(to, cc, bcc, subject, body);
							}
						}
					} catch (Exception ex) {
						ex.printStackTrace();
					}

				}

			}
		} catch (RuntimeException re) {
			throw re;
		}
	}*/

	public String GetSLAStatus(Date groupSlaDate) {
		try {
			int slaTimeLeft = calculateTimeDifferenceInSecond(groupSlaDate, new Date());

			if (slaTimeLeft <= 0) { // If negetive value or ZERO : SLA Fail
				return "Fail";
			} else {
				return "Pass";
			}
		} catch (RuntimeException re) {
			throw re;
		}

	}

	public Date getTaskLevelSla(String vip, String loyalityIndicator, int issueSolutionCategoryMapId, int groupFrom,
			int groupTo) {
		Slatasklevel slatasklevel = null;
		// SLA slaUtil = new SLA();
		try {
			if (StringUtils.equalsIgnoreCase(vip, "yes")) {
				// Vip sla
				slatasklevel = slatasklevelDao.findByCategoryIssueSolnVip(issueSolutionCategoryMapId, "yes", groupFrom,
						groupTo);
			} else if (StringUtils.isNotEmpty(loyalityIndicator)) {
				// Loyality sla
				slatasklevel = slatasklevelDao.findByCategoryIssueSolnLoyaltyIndicator(issueSolutionCategoryMapId,
						loyalityIndicator, groupFrom, groupTo);
			} else {
				// General sla
				slatasklevel = slatasklevelDao.findByCategoryIssueSolnForGeneral(issueSolutionCategoryMapId, groupFrom,
						groupTo);
			}
			if (slatasklevel == null) {
				return getSlaDate(72, "Flat");
			} else {
				return getSlaDate(slatasklevel.getSlahour(), slatasklevel.getSlatype());
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	public Date getDivisionLevelSla(String vip, String loyalityIndicator, int issueSolutionCategoryMapId,
			String division) {
		Sladivisionlevel slaDivisionLevel = null;
		// SLA slaUtil = new SLA();
		try {
			if (StringUtils.equalsIgnoreCase(vip, "yes")) {
				// Vip sla
				slaDivisionLevel = sladivisionlevelDao.findByCategoryIssueSolnVip(issueSolutionCategoryMapId, "yes",
						division);
			} else if (StringUtils.isNotEmpty(loyalityIndicator)) {
				// Loyality sla
				slaDivisionLevel = sladivisionlevelDao.findByCategoryIssueSolnLoyaltyIndicator(
						issueSolutionCategoryMapId, loyalityIndicator, division);
			} else {
				// General sla
				slaDivisionLevel = sladivisionlevelDao.findByCategoryIssueSolnForGeneral(issueSolutionCategoryMapId,
						division);
			}
			if (slaDivisionLevel == null) {
				return getSlaDate(72, "Flat");
			} else {
				return getSlaDate(slaDivisionLevel.getDivisionSlaHour(), "Flat");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	public Date getCommittedFeedbackSla(String vip, String loyalityIndicator, int issueSolutionCategoryMapId) {
		Slaendtoend slaendtoend = null;
		// SLA slaUtil = new SLA();
		try {
			if (StringUtils.equalsIgnoreCase(vip, "yes")) {
				// Vip sla
				slaendtoend = slaendtoendDao.findByCategoryIssueSolnVip(issueSolutionCategoryMapId, "yes");
			} else if (StringUtils.isNotEmpty(loyalityIndicator)) {
				// Loyality sla
				slaendtoend = slaendtoendDao.findByCategoryIssueSolnLoyaltyIndicator(issueSolutionCategoryMapId,
						loyalityIndicator);
			} else {
				// General sla
				slaendtoend = slaendtoendDao.findByCategoryIssueSolnForGeneral(issueSolutionCategoryMapId);
			}
			if (slaendtoend == null) {
				return getSlaDate(72, "Flat");
			} else {
				return getSlaDate(slaendtoend.getCommittedFeedbackSlaHour(), "Flat");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (slaendtoend == null) {
			return getSlaDate(72, "Flat");
		} else {
			return getSlaDate(slaendtoend.getCommittedFeedbackSlaHour(), "Flat");
		}
	}

	public Date getCommittedSolutionSla(String vip, String loyalityIndicator, int issueSolutionCategoryMapId) {
		Slaendtoend slaendtoend = null;
		// SLA slaUtil = new SLA();
		try {
			if (StringUtils.equalsIgnoreCase(vip, "yes")) {
				// Vip sla
				slaendtoend = slaendtoendDao.findByCategoryIssueSolnVip(issueSolutionCategoryMapId, "yes");
			} else if (StringUtils.isNotEmpty(loyalityIndicator)) {
				// Loyality sla
				slaendtoend = slaendtoendDao.findByCategoryIssueSolnLoyaltyIndicator(issueSolutionCategoryMapId,
						loyalityIndicator);
			} else {
				// General sla
				slaendtoend = slaendtoendDao.findByCategoryIssueSolnForGeneral(issueSolutionCategoryMapId);
			}
			if (slaendtoend == null) {
				return getSlaDate(72, "Flat");
			} else {
				return getSlaDate(slaendtoend.getCommittedSolutionSlaHour(), "Flat");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (slaendtoend == null) {
			return getSlaDate(72, "Flat");
		} else {
			return getSlaDate(slaendtoend.getCommittedSolutionSlaHour(), "Flat");
		}
	}

}
