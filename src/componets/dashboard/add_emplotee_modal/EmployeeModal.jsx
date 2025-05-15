import React from 'react'

export default function EmployeeModal() {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <button onClick={close}>  X</button>
      </div>

      <div>
        <p>Name</p>
        <p>Manager</p>
      </div>
      <div>
        <div>
            <h2>Company details</h2>
            <p>Company: <span>Ntachi-osa Resturants</span></p>
            <p>Hire Date: <span>22ns February, 2022 (3 years)</span></p>
            <p>Employment type: <span>Full-time</span></p>
            <p>Department: <span>Administration</span></p>
        </div>
        <div>
            <h2>Contact details</h2>
            
        </div>
      </div>
    </div>
  )
}
