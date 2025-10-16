'use client';

import { useState } from 'react';
import Head from 'next/head';
import { Cloud, Sun, CloudRain, Wind, MapPin, Calendar, Home, Wrench, PartyPopper, Coffee, ShoppingBag, Star } from 'lucide-react';

export default function HoosierWeekendHelper() {
  const [selectedCity, setSelectedCity] = useState('');
  const [currentTab, setCurrentTab] = useState('weather');

  const cities = [
    { name: 'Carmel', color: 'from-blue-400 to-blue-600' },
    { name: 'Fishers', color: 'from-green-400 to-green-600' },
    { name: 'Noblesville', color: 'from-purple-400 to-purple-600' },
    { name: 'Zionsville', color: 'from-amber-400 to-amber-600' },
    { name: 'Westfield', color: 'from-red-400 to-red-600' },
    { name: 'Indianapolis', color: 'from-indigo-400 to-indigo-600' }
  ];

  const weatherData = {
    'Carmel': { temp: 72, condition: 'Sunny', icon: Sun, porchWorthy: true },
    'Fishers': { temp: 71, condition: 'Partly Cloudy', icon: Cloud, porchWorthy: true },
    'Noblesville': { temp: 70, condition: 'Sunny', icon: Sun, porchWorthy: true },
    'Zionsville': { temp: 73, condition: 'Clear', icon: Sun, porchWorthy: true },
    'Westfield': { temp: 69, condition: 'Breezy', icon: Wind, porchWorthy: true },
    'Indianapolis': { temp: 74, condition: 'Sunny', icon: Sun, porchWorthy: true }
  };

  const eventsData = {
    'Carmel': [
      { name: 'Carmel Farmers Market', time: 'Saturday 8am-12pm', location: 'Carter Green' },
      { name: 'Arts & Design District Walk', time: 'Sunday 2pm-5pm', location: 'Main Street' }
    ],
    'Fishers': [
      { name: 'Nickel Plate District Block Party', time: 'Saturday 6pm-10pm', location: 'Municipal Drive' },
      { name: 'Fishers Test Kitchen Food Tour', time: 'Sunday 12pm-3pm', location: 'Downtown Fishers' }
    ],
    'Noblesville': [
      { name: 'Noblesville Farmers Market', time: 'Saturday 8am-12pm', location: 'Federal Hill Commons' },
      { name: 'Forest Park Concert', time: 'Sunday 7pm-9pm', location: 'Forest Park' }
    ],
    'Zionsville': [
      { name: 'Village Shopping Walk', time: 'Saturday 10am-5pm', location: 'Main Street' },
      { name: 'SullivanMunce Cultural Center', time: 'Sunday 1pm-4pm', location: 'W Hawthorne St' }
    ],
    'Westfield': [
      { name: 'Grand Junction Plaza Events', time: 'Saturday 5pm-9pm', location: 'Grand Junction' },
      { name: 'Grand Park Sports Complex', time: 'All Weekend', location: 'Grand Park' }
    ],
    'Indianapolis': [
      { name: 'Broad Ripple Art Fair', time: 'Saturday 10am-6pm', location: 'Broad Ripple Village' },
      { name: 'Mass Ave Arts District', time: 'All Weekend', location: 'Massachusetts Avenue' },
      { name: 'Indianapolis City Market', time: 'Saturday 9am-2pm', location: 'Downtown' }
    ]
  };

  const homeMaintenanceData = {
    'Carmel': 'Check your sump pump - spring rains are coming!',
    'Fishers': 'Perfect weekend to clean those gutters',
    'Noblesville': 'Time to check your HVAC filters',
    'Zionsville': 'Great weather for exterior painting projects',
    'Westfield': 'Check your roof for winter damage',
    'Indianapolis': 'Power wash your deck - porch season is here!'
  };

  const WeatherIcon = selectedCity ? weatherData[selectedCity].icon : Sun;

  // Schema.org JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Hoosier Weekend Helper",
    "description": "Find the best weekend events, weather updates, and home maintenance tips for Central Indiana cities.",
    "url": "https://weekend.introindianapolis.com",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "areaServed": [
      { "@type": "City", "name": "Carmel" },
      { "@type": "City", "name": "Fishers" },
      { "@type": "City", "name": "Noblesville" },
      { "@type": "City", "name": "Zionsville" },
      { "@type": "City", "name": "Westfield" },
      { "@type": "City", "name": "Indianapolis" }
    ]
  };

  return (
    <>
      <Head>
        <title>Hoosier Weekend Helper | Central Indiana Weekend Planner</title>
        <meta name="description" content="Find the best weekend events, weather updates, and home maintenance tips for Carmel, Fishers, Noblesville, Zionsville, Westfield, and Indianapolis." />
        <meta name="keywords" content="Central Indiana events, Indianapolis weekend, Carmel events, Fishers activities, Noblesville weekend, Zionsville things to do, Westfield events" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Hoosier Weekend Helper | Central Indiana Weekend Planner" />
        <meta property="og:description" content="Find the best weekend events, weather updates, and home maintenance tips for Central Indiana." />
        <meta property="og:url" content="https://weekend.introindianapolis.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://weekend.introindianapolis.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hoosier Weekend Helper | Central Indiana Weekend Planner" />
        <meta name="twitter:description" content="Find the best weekend events, weather updates, and home maintenance tips for Central Indiana." />
        <meta name="twitter:image" content="https://weekend.introindianapolis.com/og-image.jpg" />
        
        <link rel="canonical" href="https://weekend.introindianapolis.com" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-800 to-yellow-600 text-white py-8 px-4 shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-black text-center mb-2 drop-shadow-lg">
              🏠 Hoosier Weekend Helper
            </h1>
            <p className="text-center text-xl font-bold text-yellow-100">
              Your Central Indiana Weekend Planner
            </p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* City Selection */}
          <section className="mb-8">
            <h2 className="text-3xl font-black text-gray-800 mb-6 text-center">
              Pick Your Town
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => setSelectedCity(city.name)}
                  className={`p-6 rounded-2xl font-bold text-xl shadow-xl transform transition-all hover:scale-105 ${
                    selectedCity === city.name
                      ? `bg-gradient-to-r ${city.color} text-white scale-105`
                      : 'bg-white text-gray-700 hover:shadow-2xl'
                  }`}
                >
                  <MapPin className="inline mr-2" size={24} />
                  {city.name}
                </button>
              ))}
            </div>
          </section>

          {selectedCity && (
            <>
              {/* Tabs */}
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {[
                  { id: 'weather', label: 'Porch Weather', icon: Cloud },
                  { id: 'events', label: 'Weekend Events', icon: PartyPopper },
                  { id: 'maintenance', label: 'Home To-Do', icon: Wrench }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`px-6 py-4 rounded-xl font-bold text-lg whitespace-nowrap transition-all ${
                      currentTab === tab.id
                        ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-xl scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
                    }`}
                  >
                    <tab.icon className="inline mr-2" size={20} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Weather Tab */}
              {currentTab === 'weather' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-4xl font-black mb-2">{selectedCity}</h3>
                        <p className="text-2xl font-bold text-blue-100">
                          {weatherData[selectedCity].condition}
                        </p>
                      </div>
                      <WeatherIcon size={80} className="drop-shadow-lg" />
                    </div>
                    <div className="text-6xl font-black mb-4">
                      {weatherData[selectedCity].temp}°F
                    </div>
                  </div>

                  {weatherData[selectedCity].porchWorthy && (
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-3xl p-8 shadow-2xl">
                      <h4 className="text-3xl font-black mb-3">
                        ✅ It&apos;s Porch Weather!
                      </h4>
                      <p className="text-xl font-bold">
                        Perfect day to sit outside with a sweet tea and wave at the neighbors! 
                        This is what we live for, folks! 🌞
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Events Tab */}
              {currentTab === 'events' && (
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-gray-800 mb-4">
                    This Weekend in {selectedCity}
                  </h3>
                  {eventsData[selectedCity].map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <Calendar className="text-red-600 flex-shrink-0 mt-1" size={32} />
                        <div>
                          <h4 className="text-2xl font-black text-gray-800 mb-2">
                            {event.name}
                          </h4>
                          <p className="text-lg font-bold text-gray-600 mb-1">
                            ⏰ {event.time}
                          </p>
                          <p className="text-lg font-bold text-gray-500">
                            📍 {event.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Home Maintenance Tab */}
              {currentTab === 'maintenance' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-3xl p-8 shadow-2xl">
                    <h4 className="text-3xl font-black mb-4">
                      <Wrench className="inline mr-3" size={36} />
                      Weekend Project
                    </h4>
                    <p className="text-2xl font-bold mb-6">
                      {homeMaintenanceData[selectedCity]}
                    </p>
                    <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-lg font-bold">
                        💡 <strong>Hoosier Tip:</strong> Take care of it now before it becomes a bigger problem! 
                        You know how Indiana weather can be...
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-3xl p-8 shadow-2xl">
                    <h4 className="text-2xl font-black mb-3">Reward Yourself! 🎉</h4>
                    <p className="text-lg font-bold">
                      After you finish that project, head to a local hardware store, 
                      grab a victory coffee, then check out this weekend&apos;s events. 
                      You&apos;ve earned it, Hoosier!
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <footer className="mt-12 text-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl inline-block">
              <p className="text-2xl font-black text-gray-800 mb-3">
                Made with ❤️ for Central Indiana
              </p>
              <p className="text-base text-gray-600 font-bold mb-4">
                Carmel • Fishers • Noblesville • Zionsville • Westfield • Indianapolis
              </p>
              <div className="mt-4 pt-4 border-t-2 border-gray-200">
                <p className="text-red-600 font-black text-lg">
                  🏀 Go Hoosiers! 🌽
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}