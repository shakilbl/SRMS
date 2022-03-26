<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html data-ng-app="myApp">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>SRMS - Enterprise Collection Ticketing Tool</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">

<!-- Jquery Stuff -->
<script src="resources/js/jQuery-2.1.4.min.js"></script>
<script src="resources/js/jquery-ui.min.js"></script>
<!-- Bootstrap Stuff -->
<link rel="stylesheet" href="resources/css/bootstrap.min.css">
<script src="resources/js/bootstrap.min.js"></script>
<!-- Angular Stuff -->
<script src="resources/js/angular.js"></script>

<script src="<c:url value='resources/js/angular-route.min.js' />"></script>


<link rel="stylesheet" href="resources/css/angular-chart.css">
<script src="resources/js/angular.min.js"></script>
<script src="resources/js/Chart.js"></script>
<script src="resources/js/angular-chart.js"></script>

<!-- Other Stuff -->
<link rel="stylesheet"
	href="resources/layout_resources/font-awesome-4.5.0/css/font-awesome.min.css">
<link rel="stylesheet"
	href="resources/layout_resources/dist/css/main.css">
<link rel="stylesheet"
	href="resources/layout_resources/dist/css/skins/_all-skins.min.css">
<script src="resources/layout_resources/dist/js/app.min.js"></script>

<script src="<c:url value='/resources/js/ui-bootstrap-tpls.min.js' />"></script>

<script type="text/javascript" src="resources/js/bstable.js"></script>
<script type="text/javascript" src="resources/js/angular-messages.js"></script>

<!-- <link rel="stylesheet"
	href="resources/layout_resources/css/ng-table.min.css"> -->
<script type="text/javascript" src="resources/js/ng-table.min.js"></script>

<script src="<c:url value='/resources/js/app_js/app.js' />"></script>

<script src="<c:url value='/resources/js/app_js/login_sevice.js' />"></script>
<script src="<c:url value='/resources/js/app_js/login_controller.js' />"></script>
<script src="<c:url value='/resources/js/ng-table-to-csv.js' />"></script>
<script src="<c:url value='/resources/js/datetime.js' />"></script>


<style type="text/css">
input:invalid {
    border: 1px solid red;
}
textarea:invalid {
    border: 1px solid red;
} 
select{
    border: 1px solid red;  
    color:grey;
}
select:required{border-right:5px solid red;}
select:valid{border-right: 5px solid green;} 
</style> 


</head>
<body class="hold-transition skin-blue sidebar-mini">
	<div class="wrapper">
		<header class="main-header">
			<a href="/SRMS_DS/landingpage" class="logo"> <!-- mini logo for sidebar mini 50x50 pixels -->
				<span class="logo-mini"><img
					src="resources/layout_resources/dist/img/Grameenphone_Logo.png"
					class="user-image" alt="GP Logo" height="40" width="50">ECTT</span>
				<!-- logo for regular state and mobile devices --> <span
				class="logo-lg"><img
					src="resources/layout_resources/dist/img/Grameenphone_Logo.png"
					class="user-image" alt="GP Logo" height="40" width="50"><b>ECTT</b></span>
			</a>
			<!-- Header Navbar: style can be found in header.less -->
			<nav class="navbar navbar-static-top" role="navigation">
				<!-- Sidebar toggle button-->
				<a href="#" class="sidebar-toggle" data-toggle="offcanvas"
					role="button"> <span class="sr-only">Toggle navigation</span>
				</a>
				<div class="navbar-custom-menu" ng-controller="LoginController">
					<ul class="nav navbar-nav">
						<!-- User Account: style can be found in dropdown.less -->
						<li class="dropdown user user-menu"><a href="#"
							ng-click="logout()" class="dropdown-toggle"
							data-toggle="dropdown"> <!--<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">-->
								<span class="hidden-xs"> <c:if
										test="${sessionScope.windowsloginid != null}"> Welcome: ${sessionScope.windowsloginid}:${sessionScope.usertype}(Logout) </c:if>
							</span>

						</a>
					</ul>
				</div>
			</nav>
		</header>
		<!-- Left side column. contains the logo and sidebar -->
		<aside class="main-sidebar">
			<!-- sidebar: style can be found in sidebar.less -->
			<section class="sidebar">
				<!-- sidebar menu: : style can be found in sidebar.less -->
				<ul class="sidebar-menu">
					<li class="header"><h4>MAIN NAVIGATION</h4></li>
					<!-- Menu Will Go Here F@-->
					<tiles:insertAttribute name="menu" />
				</ul>
			</section>
			<!-- /.sidebar -->
		</aside>
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
				<!-- <h1>Service Request Summery</h1> -->
				<!-- <ol class="breadcrumb">
					<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
					<li class="active">Dashboard</li>
				</ol> -->
			</section>
			<!-- Main content -->
			<section class="content">
				<!-- <div class="container"> -->
				<!-- content will be placed here -->
				<tiles:insertAttribute name="body" />
				<!-- </div> -->
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
		<footer class="main-footer">
			<div class="pull-right hidden-xs">
				<b>Developed by Accenture Bangadesh</b>
			</div>
			<strong>Copyright &copy; 2016 </strong> <a
				href="http://www.grameenphone.com">GrameenPhone</a>
		</footer>
	</div>
	
	

	
	
</body>
</html>

