import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Signup = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = React.useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.name);
      // Don't navigate immediately - let the user confirm their email first
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      // navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex flex-col items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-md">
        <div className="flex items-center mb-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="p-2">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </Button>
          </Link>
        </div>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">Sharify</span>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">Join Sharify</CardTitle>
          <p className="text-gray-600 text-sm sm:text-base">Create your account to get started</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Create a password"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                📧 After signing up, you can directly sign in using credentials
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
