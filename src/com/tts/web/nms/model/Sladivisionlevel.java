package com.tts.web.nms.model;
// Generated Jun 23, 2016 1:48:44 PM by Hibernate Tools 5.1.0.Alpha1

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Sladivisionlevel generated by hbm2java
 */
@Entity
@Table(name = "sladivisionlevel", catalog = "SRMSDB")
public class Sladivisionlevel implements java.io.Serializable {

	private Integer divisionLevelSlaid;
	private Issuesolutioncategorymap issuesolutioncategorymap;
	private String vipsla;
	private String bscodeOrStar;
	private String loyaltyIndicator;
	private String fromDivision;
	private String toDivision;
	private Integer divisionSlaHour;
	private String createdby;
	private Date createddate;
	private String updatedby;
	private Date updateddate;

	public Sladivisionlevel() {
	}

	public Sladivisionlevel(Issuesolutioncategorymap issuesolutioncategorymap, String vipsla, String bscodeOrStar,
			String loyaltyIndicator, String fromDivision, String toDivision, Integer divisionSlaHour, String createdby,
			Date createddate, String updatedby, Date updateddate) {
		this.issuesolutioncategorymap = issuesolutioncategorymap;
		this.vipsla = vipsla;
		this.bscodeOrStar = bscodeOrStar;
		this.loyaltyIndicator = loyaltyIndicator;
		this.fromDivision = fromDivision;
		this.toDivision = toDivision;
		this.divisionSlaHour = divisionSlaHour;
		this.createdby = createdby;
		this.createddate = createddate;
		this.updatedby = updatedby;
		this.updateddate = updateddate;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "DivisionLevelSLAID", unique = true, nullable = false)
	public Integer getDivisionLevelSlaid() {
		return this.divisionLevelSlaid;
	}

	public void setDivisionLevelSlaid(Integer divisionLevelSlaid) {
		this.divisionLevelSlaid = divisionLevelSlaid;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "IssueSolutionCategoryMapID")
	public Issuesolutioncategorymap getIssuesolutioncategorymap() {
		return this.issuesolutioncategorymap;
	}

	public void setIssuesolutioncategorymap(Issuesolutioncategorymap issuesolutioncategorymap) {
		this.issuesolutioncategorymap = issuesolutioncategorymap;
	}

	@Column(name = "VIPSLA", length = 20)
	public String getVipsla() {
		return this.vipsla;
	}

	public void setVipsla(String vipsla) {
		this.vipsla = vipsla;
	}

	@Column(name = "BSCodeOrStar", length = 50)
	public String getBscodeOrStar() {
		return this.bscodeOrStar;
	}

	public void setBscodeOrStar(String bscodeOrStar) {
		this.bscodeOrStar = bscodeOrStar;
	}

	@Column(name = "LoyaltyIndicator", length = 50)
	public String getLoyaltyIndicator() {
		return this.loyaltyIndicator;
	}

	public void setLoyaltyIndicator(String loyaltyIndicator) {
		this.loyaltyIndicator = loyaltyIndicator;
	}

	@Column(name = "FromDivision", length = 50)
	public String getFromDivision() {
		return this.fromDivision;
	}

	public void setFromDivision(String fromDivision) {
		this.fromDivision = fromDivision;
	}

	@Column(name = "ToDivision", length = 50)
	public String getToDivision() {
		return this.toDivision;
	}

	public void setToDivision(String toDivision) {
		this.toDivision = toDivision;
	}

	@Column(name = "DivisionSlaHour")
	public Integer getDivisionSlaHour() {
		return this.divisionSlaHour;
	}

	public void setDivisionSlaHour(Integer divisionSlaHour) {
		this.divisionSlaHour = divisionSlaHour;
	}

	@Column(name = "Createdby", length = 100)
	public String getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(String createdby) {
		this.createdby = createdby;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Createddate", length = 19)
	public Date getCreateddate() {
		return this.createddate;
	}

	public void setCreateddate(Date createddate) {
		this.createddate = createddate;
	}

	@Column(name = "Updatedby", length = 100)
	public String getUpdatedby() {
		return this.updatedby;
	}

	public void setUpdatedby(String updatedby) {
		this.updatedby = updatedby;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Updateddate", length = 19)
	public Date getUpdateddate() {
		return this.updateddate;
	}

	public void setUpdateddate(Date updateddate) {
		this.updateddate = updateddate;
	}

}