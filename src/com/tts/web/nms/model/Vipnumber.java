package com.tts.web.nms.model;
// Generated Jun 5, 2016 4:28:34 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Vipnumber generated by hbm2java
 */
@Entity
@Table(name = "vipnumber", catalog = "SRMSDB")
public class Vipnumber implements java.io.Serializable {

	private Integer vipnumberId;
	private String msisdn;
	private String active;
	private String createdby;
	private Date creationdate;
	private String updatedby;
	private Date updateddate;

	public Vipnumber() {
	}

	public Vipnumber(String msisdn, String active) {
		this.msisdn = msisdn;
		this.active = active;
	}

	public Vipnumber(String msisdn, String active, String createdby, Date creationdate, String updatedby,
			Date updateddate) {
		this.msisdn = msisdn;
		this.active = active;
		this.createdby = createdby;
		this.creationdate = creationdate;
		this.updatedby = updatedby;
		this.updateddate = updateddate;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "VIPNumberID", unique = true, nullable = false)
	public Integer getVipnumberId() {
		return this.vipnumberId;
	}

	public void setVipnumberId(Integer vipnumberId) {
		this.vipnumberId = vipnumberId;
	}

	@Column(name = "msisdn", nullable = false, length = 100)
	public String getMsisdn() {
		return this.msisdn;
	}

	public void setMsisdn(String msisdn) {
		this.msisdn = msisdn;
	}

	@Column(name = "active", nullable = false, length = 10)
	public String getActive() {
		return this.active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	@Column(name = "createdby", length = 50)
	public String getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(String createdby) {
		this.createdby = createdby;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "creationdate", length = 19)
	public Date getCreationdate() {
		return this.creationdate;
	}

	public void setCreationdate(Date creationdate) {
		this.creationdate = creationdate;
	}

	@Column(name = "updatedby", length = 50)
	public String getUpdatedby() {
		return this.updatedby;
	}

	public void setUpdatedby(String updatedby) {
		this.updatedby = updatedby;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updateddate", length = 19)
	public Date getUpdateddate() {
		return this.updateddate;
	}

	public void setUpdateddate(Date updateddate) {
		this.updateddate = updateddate;
	}

}