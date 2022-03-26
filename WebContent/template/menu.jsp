
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<li class="active treeview"><a href="#"> <i
		class="fa fa-dashboard"></i> <span>Master Data</span> <i
		class="fa fa-angle-left pull-right"></i>
</a>
	<ul class="treeview-menu">
		<li><a href="#"><i class="fa fa-circle-o"></i> User
				Management</a>
			<ul class="treeview-menu">
				<li><a href="<c:url value='UserCategory'/>"><i
						class="fa fa-circle-o"></i> User Category </a></li>
				<li><a href="<c:url value='User'/>"><i
						class="fa fa-circle-o"></i> User </a></li>
				<li><a href="<c:url value='UserGroup'/>"><i
						class="fa fa-circle-o"></i> User Group </a></li>
				<li><a href="<c:url value='UserBToB'/>"><i
						class="fa fa-circle-o"></i> User B To B Sub Group </a></li>
				<li><a href="<c:url value='UserGroupMap'/>"><i
						class="fa fa-circle-o"></i> User & UserGroup Mapping</a></li>
				<li><a href="<c:url value='UserGroupAccess'/>"><i
						class="fa fa-circle-o"></i> User Group Access</a></li>

				<li><a href="<c:url value='UserGroupBusinessProcessMap'/>"><i
						class="fa fa-circle-o"></i> UserGroup Business Process<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						Map </a></li></li>
	</ul></li>
</ul>

<%-- <ul class="treeview-menu">
	<li><a href="#"><i class="fa fa-circle-o"></i> SLA Management</a>
		<ul class="treeview-menu">
			<li><a href="<c:url value='SlaEndToEnd'/>"><i
					class="fa fa-circle-o"></i> Sla End To End</a></li>
			<li><a href="<c:url value='SlaDivisionLevel'/>"><i
					class="fa fa-circle-o"></i> Sla Division Level</a></li>
			<li><a href="<c:url value='SlaTaskLevel'/>"><i
					class="fa fa-circle-o"></i> Sla Task Level </a></li>

			<li><a href="<c:url value='Phase2sla'/>"><i
					class="fa fa-circle-o"></i> SLA </a></li>


		</ul></li>
</ul> --%>
<ul class="treeview-menu">
	<li><a href="#"><i class="fa fa-circle-o"></i> I/S Management</a>
		<ul class="treeview-menu">
			<li><a href="<c:url value='IssueSolutionCategory'/>"><i
					class="fa fa-circle-o"></i> Issue Category </a></li>
			<li><a href="<c:url value='IssueSolution'/>"><i
					class="fa fa-circle-o"></i> I/S Sub-Category </a></li>

			<li><a href="<c:url value='IssueSolutionCategoryMap'/>"><i
					class="fa fa-circle-o"></i> I/S Cat & Sub-Cat Map</a></li>

			<li><a href="<c:url value='IssueSolutionCategoryFieldMap'/>"><i
					class="fa fa-circle-o"></i> ISC FieldMap </a></li>

		</ul></li>
</ul>

<ul class="treeview-menu">
	<li><a href="#"><i class="fa fa-circle-o"></i>DS Master Data</a>
		<ul class="treeview-menu">
			<li><a href="<c:url value='CollectionMode'/>"><i
					class="fa fa-circle-o"></i> Collection Mode </a></li>
					
			<li><a href="<c:url value='BankNames'/>"><i
					class="fa fa-circle-o"></i> Bank Names </a></li>
		</ul></li>
</ul>
<%-- <li class="treeview"><a href="<c:url value='Remarks'/>"> <i
		class="fa fa-dashboard"></i> <span>DS_Remarks</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>

<%-- <li class="treeview"><a href="<c:url value='BankNames'/>"> <i
		class="fa fa-dashboard"></i> <span>DS_Bank Names</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>
<%-- <ul class="treeview-menu">
	<li><a href="#"><i class="fa fa-circle-o"></i> WF Management</a>
		<ul class="treeview-menu">
			<li><a href="<c:url value='WorkFlowHeader'/>"><i
					class="fa fa-circle-o"></i> WF Header </a></li>
			<li><a href="<c:url value='wflineHome'/>"><i
					class="fa fa-circle-o"></i> WF Line </a></li>
		</ul></li>
</ul> --%>
<%-- <ul class="treeview-menu">
	<li><a href="<c:url value='Holiday'/>"><i
			class="fa fa-circle-o"></i> Holiday </a></li>
</ul> --%>
<%-- <ul class="treeview-menu">
	<li><a href="<c:url value='createVipNumber'/>"><i
			class="fa fa-circle-o"></i> VIP Number </a></li>
</ul> --%>


<%-- <ul class="treeview-menu">
	<li><a href="<c:url value='sms'/>"><i class="fa fa-circle-o"></i>
			SMS Template </a></li>
</ul> --%>



<%-- <ul class="treeview-menu">
	<li><a href="#"><i class="fa fa-circle-o"></i> Area Management</a>
		<ul class="treeview-menu">
			<li><a href="<c:url value='thana'/>"><i
					class="fa fa-circle-o"></i> Thana </a></li>
			<li><a href="<c:url value='district'/>"><i
					class="fa fa-circle-o"></i> District </a></li>
			<li><a href="<c:url value='division'/>"><i
					class="fa fa-circle-o"></i> Division </a></li>
			<li><a href="<c:url value='circle'/>"><i
					class="fa fa-circle-o"></i> Circle </a></li>
			<li><a href="<c:url value='subcircle'/>"><i
					class="fa fa-circle-o"></i> Sub-Circle </a></li>

		</ul></li>
</ul> --%>

<%-- 	<ul class="treeview-menu">
		<li><a href="<c:url value='Site'/>"><i class="fa fa-circle-o"></i>
				Site </a></li>
	</ul> --%>
<%-- <ul class="treeview-menu">
	<li><a href="<c:url value='BusinessProcess'/>"><i
			class="fa fa-circle-o"></i> Business Process </a></li>
</ul> --%>






<%-- <li class="treeview"><a
	href="<c:url value='servicerequestdummy#/'/>"> <i
		class="fa fa-dashboard"></i> <span>Service Request Creation</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>

<%-- <li class="treeview"><a href="<c:url value='TicketCreation2'/>">
		<i class="fa fa-dashboard"></i> <span>SA Ticket Creation</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>

<li class="treeview"><a href="<c:url value='DSTicketCreation'/>">
		<i class="fa fa-dashboard"></i> <span>DS Ticket Creation</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li>

<%-- <li class="treeview"><a href="<c:url value='Search'/>"> <i
		class="fa fa-dashboard"></i> <span>Ticket Search</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>
<%-- <li class="treeview"><a href="<c:url value='EditTicketList'/>"> <i
		class="fa fa-dashboard"></i> <span>Edit Ticket List</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>
<%-- <li class="treeview"><a href="<c:url value='BulkTicketCreation'/>">
		<i class="fa fa-dashboard"></i> <span>Bulk Ticket Creation</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>

<li class="treeview"><a href="<c:url value='landingpage'/>"> <i
		class="fa fa-dashboard"></i> <span>Landing Page</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li>

<li class="treeview"><a href="<c:url value='DSTicketDetailsView'/>"> <i
		class="fa fa-dashboard"></i> <span>View TIcket Details</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li>
<li class="treeview"><a href="<c:url value='DSReport'/>"> <i
		class="fa fa-dashboard"></i> <span>Report</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li>

<%-- <li class="treeview"><a href="<c:url value='CustomerFeedBack'/>">
		<i class="fa fa-dashboard"></i> <span>Customer Feedback</span> <i
		class="fa fa-angle-left pull-right"></i>
</a></li> --%>
<!-- <li class="treeview"><a href="#"> <i class="fa fa-dashboard"></i>
		<span>DashBoard</span> <i class="fa fa-angle-left pull-right"></i>
</a>
	<ul class="treeview-menu">
		<li><a href="TopTenComplaintTrend"><i class="fa fa-circle-o"></i>
				Top Ten Complaint Trend</a></li>
		<li><a href="TopTenSRTrend"><i class="fa fa-circle-o"></i>
				Top Ten SR Trend</a></li>
		<li><a href="TopTenDeviation"><i class="fa fa-circle-o"></i>
				Top Ten Deviation</a></li>
		<li><a href="TotalIncomingDistribution"><i
				class="fa fa-circle-o"></i> Total Incoming Distribution</a></li>
		<li><a href="PendingSRStatus"><i class="fa fa-circle-o"></i>
				Pending SR Status</a></li>
	</ul></li> -->


<%-- <li class="active treeview"><a href="#"> <i
		class="fa fa-dashboard"></i> <span>Report</span> <i
		class="fa fa-angle-left pull-right"></i>
</a>
	<ul class="treeview-menu">
		<li><a href="#"><i class="fa fa-circle-o"></i> Reports </a>
			<ul class="treeview-menu">
				<li><a href="<c:url value='DSReport'/>"><i
						class="fa fa-circle-o"></i> Report</a></li>
				<li><a href="<c:url value='CircleWiseCompliantStatus'/>"><i
						class="fa fa-circle-o"></i> Complaint Type Report</a></li>
				<li><a href="<c:url value='WeeklyStatusReport'/>"><i
						class="fa fa-circle-o"></i> Weekly Status Report</a></li>
				<li><a href="<c:url value='YearlyCompliantStatus'/>"><i
						class="fa fa-circle-o"></i> Yearly Status Report</a></li>
				<li><a href="<c:url value='MajorSevenThana'/>"><i
						class="fa fa-circle-o"></i> Top Seven Thana Report</a></li>
				<li><a href="<c:url value='OpenOrClosed'/>"><i
						class="fa fa-circle-o"></i> Yearly Solution Status Report</a></li>
				<li><a href="<c:url value='SectionwiseOpen'/>"><i
						class="fa fa-circle-o"></i> Sectionwise Open Complaint Report</a></li>
				<li><a href="<c:url value='CircleComplaintSolutionStatus'/>"><i
						class="fa fa-circle-o"></i> Technology Open Report</a></li>
				<li><a href="<c:url value='NewSiteBudgetConstraint'/>"><i
						class="fa fa-circle-o"></i> New Site Budget Constraint</a></li>
			</ul></li>

		<li active treeview><a href="<c:url value='ProductionReport'/>"><i
				class="fa fa-circle-o"></i> Production Report </a></li>
		<li><a href="<c:url value='Resolution'/>"><i
				class="fa fa-circle-o"></i> Resolution </a></li>
		<li><a href="#"><i class="fa fa-circle-o"></i> Weekly Report</a>
			<ul class="treeview-menu">
				<li><a href="<c:url value='WeeklyReportComplaintHit'/>"><i
						class="fa fa-circle-o"></i> Weekly Report by Complaint <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						& Hit </a></li>
				<li><a href="<c:url value='WeeklyComplaintStatus'/>"><i
						class="fa fa-circle-o"></i> Weekly complaint<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						status </a></li>
				<li><a href="<c:url value='ComplaintwiseE2ESLA'/>"><i
						class="fa fa-circle-o"></i> Complaintwise E2E SLA </a></li>
				<li><a href="<c:url value='SubCatNetCom'/>"><i
						class="fa fa-circle-o"></i> Sub Categorywise Network<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						Complaint Trend</a></li>
				<li><a href="<c:url value='HighCategorywise'/>"><i
						class="fa fa-circle-o"> </i> Map High Categorywise </a></li>
			</ul></li>
		<li active treeview><a href="#"><i
				class="fa fa-circle-o"></i> DS Report </a>
			<ul class="treeview-menu">
				<li><a href="<c:url value='DSReport'/>"><i
						class="fa fa-circle-o"></i> Report 1 <br> </a></li>
				<li><a href="<c:url value='SOCGroupSLaMonthlyWeekly'/>"><i
						class="fa fa-circle-o"></i> Group Sla Monthly Yearly <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						Quaterly Report </a></li>
				<li><a href="<c:url value='SOCE2E'/>"><i
						class="fa fa-circle-o"></i> E2E Sla Report<br> </a></li>
				<li><a href="<c:url value='SOCTatOpen'/>"><i
						class="fa fa-circle-o"></i> TAT Report<br> </a></li>
				<li><a href="<c:url value='SOCDeptWiseSla'/>"><i
						class="fa fa-circle-o"></i>Dept WIse Report<br> </a></li>
			</ul></li>


	</ul></li> --%>
</ul>
</li>