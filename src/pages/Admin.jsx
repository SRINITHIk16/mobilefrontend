import { useState } from 'react';
import { Plus, Edit, Trash2, Users, CreditCard, TrendingUp, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Admin = () => {
  const { plans, rechargeHistory, updatePlan, deletePlan, addPlan, getUsersWhoRecharged } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    validity: '',
    data: '',
    calls: '',
    sms: ''
  });

  const rechargedUsers = getUsersWhoRecharged();
  const filteredUsers = rechargedUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <Users className="h-8 w-8 text-primary" />,
      change: '+12%'
    },
    {
      title: 'Total Recharges',
      value: rechargeHistory.length,
      icon: <CreditCard className="h-8 w-8 text-secondary" />,
      change: '+8%'
    },
    {
      title: 'Revenue',
      value: `₹${rechargeHistory.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`,
      icon: <TrendingUp className="h-8 w-8 text-success" />,
      change: '+15%'
    }
  ];

  const handleAddPlan = (e) => {
    e.preventDefault();
    addPlan({
      ...newPlan,
      price: parseInt(newPlan.price)
    });
    setNewPlan({
      name: '',
      price: '',
      validity: '',
      data: '',
      calls: '',
      sms: ''
    });
    alert('Plan added successfully!');
  };

  const handleUpdatePlan = (e) => {
    e.preventDefault();
    updatePlan(editingPlan.id, {
      ...editingPlan,
      price: parseInt(editingPlan.price)
    });
    setEditingPlan(null);
    alert('Plan updated successfully!');
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePlan(planId);
      alert('Plan deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage plans, users, and view analytics</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'plans', 'users', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-dark">{stat.value}</p>
                      <p className="text-sm text-success">{stat.change} from last month</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-dark mb-4">Recent Recharges</h3>
                <div className="space-y-3">
                  {rechargeHistory.slice(0, 5).map((recharge) => (
                    <div key={recharge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{recharge.number}</p>
                        <p className="text-sm text-gray-600">{recharge.plan}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{recharge.amount}</p>
                        <p className="text-sm text-gray-600">{recharge.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-dark mb-4">Popular Plans</h3>
                <div className="space-y-3">
                  {plans.slice(0, 4).map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-gray-600">{plan.data} • {plan.validity}</p>
                      </div>
                      <p className="font-semibold text-primary">₹{plan.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">Manage Plans</h2>
              <button
                onClick={() => setEditingPlan({ isNew: true })}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Plan
              </button>
            </div>

            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Validity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{plan.name}</td>
                      <td className="py-3 px-4">₹{plan.price}</td>
                      <td className="py-3 px-4">{plan.validity}</td>
                      <td className="py-3 px-4">{plan.data}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingPlan(plan)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">Users Who Recharged</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Recharges</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Recharge</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                          {user.totalRecharges}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-green-600">₹{user.totalAmount}</td>
                      <td className="py-3 px-4 text-gray-600">{user.lastRecharge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No users found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="card">
            <h2 className="text-xl font-bold text-dark mb-6">Analytics</h2>
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-500">Advanced analytics features coming soon...</p>
            </div>
          </div>
        )}

        {/* Edit/Add Plan Modal */}
        {editingPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-dark mb-4">
                {editingPlan.isNew ? 'Add New Plan' : 'Edit Plan'}
              </h3>
              
              <form onSubmit={editingPlan.isNew ? handleAddPlan : handleUpdatePlan} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                  <input
                    type="text"
                    value={editingPlan.isNew ? newPlan.name : editingPlan.name}
                    onChange={(e) => editingPlan.isNew 
                      ? setNewPlan({...newPlan, name: e.target.value})
                      : setEditingPlan({...editingPlan, name: e.target.value})
                    }
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="number"
                      value={editingPlan.isNew ? newPlan.price : editingPlan.price}
                      onChange={(e) => editingPlan.isNew 
                        ? setNewPlan({...newPlan, price: e.target.value})
                        : setEditingPlan({...editingPlan, price: e.target.value})
                      }
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Validity</label>
                    <input
                      type="text"
                      value={editingPlan.isNew ? newPlan.validity : editingPlan.validity}
                      onChange={(e) => editingPlan.isNew 
                        ? setNewPlan({...newPlan, validity: e.target.value})
                        : setEditingPlan({...editingPlan, validity: e.target.value})
                      }
                      className="input-field"
                      placeholder="e.g., 28 days"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input
                    type="text"
                    value={editingPlan.isNew ? newPlan.data : editingPlan.data}
                    onChange={(e) => editingPlan.isNew 
                      ? setNewPlan({...newPlan, data: e.target.value})
                      : setEditingPlan({...editingPlan, data: e.target.value})
                    }
                    className="input-field"
                    placeholder="e.g., 2GB/day"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Calls</label>
                    <input
                      type="text"
                      value={editingPlan.isNew ? newPlan.calls : editingPlan.calls}
                      onChange={(e) => editingPlan.isNew 
                        ? setNewPlan({...newPlan, calls: e.target.value})
                        : setEditingPlan({...editingPlan, calls: e.target.value})
                      }
                      className="input-field"
                      placeholder="e.g., Unlimited"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMS</label>
                    <input
                      type="text"
                      value={editingPlan.isNew ? newPlan.sms : editingPlan.sms}
                      onChange={(e) => editingPlan.isNew 
                        ? setNewPlan({...newPlan, sms: e.target.value})
                        : setEditingPlan({...editingPlan, sms: e.target.value})
                      }
                      className="input-field"
                      placeholder="e.g., 100/day"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingPlan(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingPlan.isNew ? 'Add Plan' : 'Update Plan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;