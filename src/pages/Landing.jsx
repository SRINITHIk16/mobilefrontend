import { Link } from 'react-router-dom';
import { CreditCard, Zap, Shield, Clock, Star, ArrowRight } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Recharge",
      description: "Lightning-fast recharges completed within seconds"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "100% Secure",
      description: "Bank-grade security for all your transactions"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 Service",
      description: "Round-the-clock service availability"
    }
  ];

  const testimonials = [
    {
      name: "Sri",
      rating: 5,
      comment: "Super fast and reliable service. Never had any issues!"
    },
    {
      name: "Vinil",
      rating: 5,
      comment: "Best recharge platform I've used. Highly recommended!"
    },
    {
      name: "Bavana",
      rating: 5,
      comment: "Great user interface and instant recharges. Love it!"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-bg-primary via-purple-50 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-hero-pattern opacity-40"></div>
        <div className="absolute inset-0 bg-mobile-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-dark mb-6">
                Recharge Your Mobile
                <span className="text-primary block">Instantly!</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fast, secure, and hassle-free mobile recharges for all major networks. 
                Get the best plans and instant service 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/recharge-plans" className="btn-primary inline-flex items-center justify-center">
                  View Plans <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/signup" className="btn-outline inline-flex items-center justify-center">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-50 rounded-2xl shadow-2xl p-8">
                <div className="bg-linear-to-br from-primary to-secondary rounded-xl p-6 text-white text-center">
                  <CreditCard className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Mobile Recharge</h3>
                  <p className="text-primary-100">Quick & Easy</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-lg text-red-600">airtel</span>
                  </div>
                  <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-lg text-blue-600">Jio</span>
                  </div>
                  <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-lg text-purple-600">Vi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Why Choose RechargeHub?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the best mobile recharge service with unmatched features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <p className="font-semibold text-dark">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join RechargeHub today and experience hassle-free mobile recharges
          </p>
          <Link to="/signup" className="bg-pink-50 text-primary hover:bg-pink-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center">
            Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;