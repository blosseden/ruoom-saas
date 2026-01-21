import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic E: Customer Management Page
 * 고객 목록 및 관리
 */
const Customers: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'inactive'
  >('all');

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: '홍길동',
      email: 'honggildong@example.com',
      phone: '010-1234-5678',
      status: 'active',
      totalBookings: 12,
      totalSpent: '₩1,200,000',
      lastBooking: '2026-01-15',
      memberSince: '2025-06-01',
    },
    {
      id: 2,
      name: '김철수',
      email: 'kimcheolsu@example.com',
      phone: '010-2345-6789',
      status: 'active',
      totalBookings: 8,
      totalSpent: '₩800,000',
      lastBooking: '2026-01-14',
      memberSince: '2025-07-15',
    },
    {
      id: 3,
      name: '이영희',
      email: 'leeyounghee@example.com',
      phone: '010-3456-7890',
      status: 'inactive',
      totalBookings: 5,
      totalSpent: '₩500,000',
      lastBooking: '2025-12-20',
      memberSince: '2025-05-10',
    },
    {
      id: 4,
      name: '박민수',
      email: 'parkminsu@example.com',
      phone: '010-4567-8901',
      status: 'active',
      totalBookings: 20,
      totalSpent: '₩2,000,000',
      lastBooking: '2026-01-16',
      memberSince: '2025-03-01',
    },
    {
      id: 5,
      name: '최수진',
      email: 'choisujin@example.com',
      phone: '010-5678-9012',
      status: 'active',
      totalBookings: 15,
      totalSpent: '₩1,500,000',
      lastBooking: '2026-01-13',
      memberSince: '2025-04-20',
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesStatus =
      filterStatus === 'all' || customer.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to={ROUTES.BUSINESS.DASHBOARD}>
            <strong>Ruoom KR Platform</strong>
          </Link>

          <div className="d-flex align-items-center ml-auto">
            <span className="text-muted mr-3">
              {user?.firstName} {user?.lastName}
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleSignOut}
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="container-fluid pt-4">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                      <h2 className="mb-0">Customers</h2>
                      <p className="text-muted mb-0">
                        Manage your customer base
                      </p>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-primary">
                        <i className="fe fe-plus mr-1" />
                        Add Customer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div
                        className="avatar avatar-sm"
                        style={{
                          background: '#667eea',
                          color: 'white',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        👥
                      </div>
                    </div>
                    <div className="col ml-n2">
                      <h4 className="mb-1">{customers.length}</h4>
                      <p className="small text-muted mb-0">Total Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div
                        className="avatar avatar-sm"
                        style={{
                          background: '#28a745',
                          color: 'white',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </div>
                    </div>
                    <div className="col ml-n2">
                      <h4 className="mb-1">
                        {customers.filter((c) => c.status === 'active').length}
                      </h4>
                      <p className="small text-muted mb-0">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div
                        className="avatar avatar-sm"
                        style={{
                          background: '#ffc107',
                          color: 'white',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ⏸
                      </div>
                    </div>
                    <div className="col ml-n2">
                      <h4 className="mb-1">
                        {
                          customers.filter((c) => c.status === 'inactive')
                            .length
                        }
                      </h4>
                      <p className="small text-muted mb-0">Inactive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div
                        className="avatar avatar-sm"
                        style={{
                          background: '#764ba2',
                          color: 'white',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        💰
                      </div>
                    </div>
                    <div className="col ml-n2">
                      <h4 className="mb-1">₩6M</h4>
                      <p className="small text-muted mb-0">Total Revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search customers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="fe fe-search" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex gap-2">
                        <button
                          className={`btn btn-sm ${
                            filterStatus === 'all'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterStatus('all')}
                        >
                          All
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterStatus === 'active'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterStatus('active')}
                        >
                          Active
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterStatus === 'inactive'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterStatus('inactive')}
                        >
                          Inactive
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-header-title mb-0">
                    Customer List ({filteredCustomers.length})
                  </h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm table-nowrap card-table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Bookings</th>
                          <th>Total Spent</th>
                          <th>Last Booking</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map((customer) => (
                          <tr key={customer.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="avatar avatar-sm mr-3"
                                  style={{
                                    background: '#e2e8f0',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {customer.name.charAt(0)}
                                </div>
                                <div>
                                  <Link
                                    to={`${ROUTES.BUSINESS.CUSTOMERS}/${customer.id}`}
                                    className="text-decoration-none"
                                  >
                                    <h6 className="mb-0">{customer.name}</h6>
                                  </Link>
                                  <small className="text-muted">
                                    Since {customer.memberSince}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div className="text-muted small">
                                  {customer.email}
                                </div>
                                <div className="text-muted small">
                                  {customer.phone}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  customer.status === 'active'
                                    ? 'badge-success'
                                    : 'badge-warning'
                                }`}
                              >
                                {customer.status}
                              </span>
                            </td>
                            <td>{customer.totalBookings}</td>
                            <td>{customer.totalSpent}</td>
                            <td>{customer.lastBooking}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button className="btn btn-outline-primary">
                                  <i className="fe fe-eye" />
                                </button>
                                <button className="btn btn-outline-secondary">
                                  <i className="fe fe-edit" />
                                </button>
                                <button className="btn btn-outline-danger">
                                  <i className="fe fe-trash" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredCustomers.length === 0 && (
                    <div className="text-center py-5">
                      <div
                        className="mb-3"
                        style={{ fontSize: '3rem', opacity: 0.3 }}
                      >
                        👥
                      </div>
                      <h5 className="text-muted">No customers found</h5>
                      <p className="text-muted small">
                        Try adjusting your search or filter
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredCustomers.length > 0 && (
                  <div className="card-footer">
                    <nav>
                      <ul className="pagination pagination-sm mb-0 justify-content-center">
                        <li className="page-item disabled">
                          <a className="page-link" href="#">
                            Previous
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
