import React from 'react';
import { User, Phone, Mail, Edit, Trash2 } from 'lucide-react';

export default function EmployeeModal() {
  const close = () => {
    console.log('Close modal');
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(55, 65, 81, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '512px',
      position: 'relative'
    },
    header: {
      position: 'absolute',
      top: '16px',
      left: '24px'
    },
    headerTitle: {
      color: '#6b7280',
      fontWeight: '500',
      fontSize: '14px',
      margin: 0
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    employeeInfo: {
      paddingTop: '64px',
      paddingBottom: '24px',
      textAlign: 'center'
    },
    avatar: {
      width: '80px',
      height: '80px',
      backgroundColor: '#e5e7eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    employeeName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    employeeRole: {
      color: '#6b7280',
      fontSize: '14px',
      margin: 0
    },
    content: {
      padding: '0 24px 24px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginBottom: '24px'
    },
    section: {
      
    },
    sectionTitle: {
      color: '#111827',
      fontWeight: '600',
      marginBottom: '12px',
      fontSize: '14px',
      margin: '0 0 12px 0'
    },
    detailItem: {
      marginBottom: '8px',
      fontSize: '12px'
    },
    detailLabel: {
      color: '#6b7280'
    },
    detailValue: {
      color: '#111827'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '12px'
    },
    contactIcon: {
      width: '12px',
      height: '12px',
      color: '#f97316',
      marginRight: '8px',
      flexShrink: 0
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      color: 'white',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    editButton: {
      backgroundColor: '#3b82f6'
    },
    deleteButton: {
      backgroundColor: '#ef4444'
    },
    buttonIcon: {
      width: '16px',
      height: '16px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Employee Modal</h2>
        </div>
        <button 
          onClick={close}
          style={styles.closeButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
        >
          ×
        </button>

        {/* Employee Info */}
        <div style={styles.employeeInfo}>
          <div style={styles.avatar}>
            <User style={{width: '48px', height: '48px', color: '#6b7280'}} />
          </div>
          <h3 style={styles.employeeName}>Thankgod Okenwa</h3>
          <p style={styles.employeeRole}>Manager</p>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.grid}>
            {/* Company Details */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Company Details</h4>
              <div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Company: </span>
                  <span style={styles.detailValue}>Ntachi-Osa Restaurants</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Hire Date: </span>
                  <span style={styles.detailValue}>22nd February, 2022 (3 years)</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Employment Type: </span>
                  <span style={styles.detailValue}>Full-time</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Department: </span>
                  <span style={styles.detailValue}>Administration</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Contact Details</h4>
              <div>
                <div style={styles.contactItem}>
                  <Phone style={styles.contactIcon} />
                  <span style={styles.detailValue}>0803 636 4690</span>
                </div>
                <div style={styles.contactItem}>
                  <Mail style={styles.contactIcon} />
                  <span style={styles.detailValue}>thankokenwa@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.grid}>
            {/* Account Details */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Account Details</h4>
              <div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Bank Name: </span>
                  <span style={styles.detailValue}>First Bank</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Account Number: </span>
                  <span style={styles.detailValue}>2346876509</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Deductions</h4>
              <div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Gross Pay: </span>
                  <span style={styles.detailValue}>₦150,000</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Tax rate (PAYE): </span>
                  <span style={styles.detailValue}>7%</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Health Insurance (NHIS): </span>
                  <span style={styles.detailValue}>5%</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Pension (PFA): </span>
                  <span style={styles.detailValue}>8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonContainer}>
            <button 
              style={{...styles.button, ...styles.editButton}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              <Edit style={styles.buttonIcon} />
              Edit
            </button>
            <button 
              style={{...styles.button, ...styles.deleteButton}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              <Trash2 style={styles.buttonIcon} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}