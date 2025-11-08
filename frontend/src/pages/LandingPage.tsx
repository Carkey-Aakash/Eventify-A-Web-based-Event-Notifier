
"use client"
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, Bell, Shield, Award, CheckCircle, ArrowRight, Mail, Phone, MapPin } from "lucide-react"

export default function EventifyLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 rounded-lg p-2">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Eventify</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-indigo-400 transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-indigo-400 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-indigo-400 transition-colors">
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-white hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors cursor-pointer border-none" onClick={() => navigate('/register')}>
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url('coverpic.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            <span className="drop-shadow-2xl text-shadow-lg">Transforming College Events with </span>
            <span className="text-indigo-400 drop-shadow-2xl text-shadow-lg">Eventify</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-xl font-medium text-shadow">
            Streamline event planning, automate approvals, and manage registrations with our comprehensive digital
            platform for colleges and universities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 text-xl font-bold group shadow-2xl border-2 border-indigo-500 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105 rounded-lg cursor-pointer flex items-center" onClick={() => navigate('/register')}>
              Get Started
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-5 text-xl font-bold bg-black/30 backdrop-blur-sm shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful automation tools designed specifically for college event management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg hover:shadow-xl transition-shadow p-6 hover:border-indigo-500">
              <div className="bg-indigo-600/20 rounded-lg p-3 w-fit mb-4">
                <Bell className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Notifications</h3>
              <p className="text-gray-300">
                Stay updated with instant notifications for event approvals, registrations, and important announcements
                across all stakeholders.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg hover:shadow-xl transition-shadow p-6 hover:border-indigo-500">
              <div className="bg-indigo-600/20 rounded-lg p-3 w-fit mb-4">
                <Shield className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Branch-wise Registration Controls</h3>
              <p className="text-gray-300">
                Manage event registrations with department-specific controls, ensuring proper organization and targeted
                participation.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg hover:shadow-xl transition-shadow p-6 hover:border-indigo-500">
              <div className="bg-indigo-600/20 rounded-lg p-3 w-fit mb-4">
                <Award className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Digital Certificate Management</h3>
              <p className="text-gray-300">
                Automatically generate and distribute digital certificates to participants, eliminating manual paperwork
                and delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Streamline Your Event Lifecycle</h2>
              <p className="text-lg text-gray-300 mb-8">
                From event creation to certificate distribution, Eventify automates every step of the process with
                dedicated interfaces for students, organizers, campus-chief, and administrators.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                  <span className="text-white">Automated notifications for events according to their role.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                  <span className="text-white">Centralized event history and analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                  <span className="text-white">Seamless communication between all stakeholders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                  <span className="text-white">Technical and non-technical event support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-8">
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-indigo-600 rounded-lg p-2">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Evening Tech Talk</h4>
                      <p className="text-sm text-gray-300">Jul 06, 2025 • 08:24 PM • Room 101, Main Campus</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    An engaging seminar on the latest tech trends and innovations.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">147 registered • completed</span>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors cursor-pointer border-none" onClick={() => navigate(`/events/${10}`)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">About Eventify</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
              Eventify is a comprehensive digital platform designed to transform how college events are planned,
              approved, and executed. Our smart automation minimizes manual effort while ensuring transparency and
              efficiency across all stakeholders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 mb-6 text-pretty">
                To revolutionize college event management by providing a structured, transparent, and user-friendly
                platform that connects students, organizers, faculty, and administrators in one seamless ecosystem.
              </p>
              <h3 className="text-2xl font-bold text-white mb-4">What We Offer</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Dedicated interfaces for all user roles</li>
                <li>• Automated approval workflows</li>
                <li>• Real-time communication and updates</li>
                <li>• Digital certificate generation and distribution</li>
                <li>• Comprehensive event analytics and history</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Platform Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">500+</div>
                  <div className="text-sm text-gray-300">Events Organized</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">50+</div>
                  <div className="text-sm text-gray-300">Colleges Using</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">10K+</div>
                  <div className="text-sm text-gray-300">Students Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">95%</div>
                  <div className="text-sm text-gray-300">Approval Efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of students and organizations already using Eventify to create amazing campus experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold group rounded-lg cursor-pointer border-none transition-colors flex items-center" onClick={() => navigate('/register')}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-semibold bg-transparent rounded-lg cursor-pointer transition-colors" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Contact Us</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
              Have questions about Eventify? We're here to help you transform your college event management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/10 rounded-lg p-3">
                    <Mail className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">support@eventify.edu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/10 rounded-lg p-3">
                    <Phone className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-300">+977 9805543751</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/10 rounded-lg p-3">
                    <MapPin className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Office</h4>
                    <p className="text-gray-300">Central campus of Technology, Dharan 14</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-input text-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-input text-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    placeholder="your.email@college.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-input text-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    placeholder="Tell us about your college's event management needs..."
                  />
                </div>
                <button className="w-full bg-indigo-400 hover:bg-indigo-500 text-white py-2 px-4 rounded-md font-medium transition-colors cursor-pointer border-none">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-indigo-600 rounded-lg p-2">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Eventify</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Eventify. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
        .text-shadow-lg {
          text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  )
}