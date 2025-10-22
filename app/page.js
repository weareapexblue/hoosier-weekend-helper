'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Sun, Calendar, Wrench, MapPin, Coffee, Sparkles, Heart, Loader, ExternalLink, RefreshCw, AlertCircle, TrendingUp, Cloud, Wind, Droplets } from 'lucide-react';

const API_BASE_URL = typeof window !== 'undefined' && window.REACT_APP_API_URL 
  ? window.REACT_APP_API_URL 
  : 'http://localhost:3001';

const HoosierWeekendHelper = () => {
  const [currentCity, setCurrentCity] = useState('Carmel');
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('porch');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastEventUpdate, setLastEventUpdate] = useState(null);
  const [eventsCached, setEventsCached] = useState(false);

  const cities = [
    { name: 'Carmel', vibe: 'Sophisticated suburbia', icon: '🎨', lat: 39.9784, lon: -86.1180, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Fishers', vibe: 'Modern & innovative', icon: '🚀', lat: 39.9568, lon: -86.0139, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Noblesville', vibe: 'Historic charm', icon: '🏛️', lat: 40.0456, lon: -86.0086, gradient: 'from-amber-500 to-orange-500' },
    { name: 'Zionsville', vibe: 'Quaint & upscale', icon: '🌸', lat: 39.9509, lon: -86.2619, gradient: 'from-pink-500 to-rose-500' },
    { name: 'Westfield', vibe: 'Family-friendly fun', icon: '🎡', lat: 40.0428, lon: -86.1276, gradient: 'from-green-500 to-emerald-500' },
    { name: 'Indianapolis', vibe: 'Big city energy', icon: '🏙️', lat: 39.7684, lon: -86.1581, gradient: 'from-red-600 to-orange-600' }
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const city = cities.find(c => c.name === currentCity);
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FIndiana%2FIndianapolis`
        );
        const data = await response.json();
        
        const weatherCode = data.current.weather_code;
        let condition = 'sunny';
        if (weatherCode >= 51 && weatherCode <= 99) condition = 'rainy';
        else if (weatherCode >= 71 && weatherCode <= 77) condition = 'snowy';
        else if (weatherCode > 3 && weatherCode < 51) condition = 'cloudy';
        
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          condition,
          precipitation: data.current.precipitation || 0
        });
      } catch (error) {
        console.error('Weather fetch error:', error);
        setWeather({
          temp: 68,
          feelsLike: 68,
          humidity: 65,
          windSpeed: 8,
          condition: 'sunny',
          precipitation: 0
        });
      }
      setLoading(false);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [currentCity]);

  // Fetch events only when Events tab is opened
  useEffect(() => {
    if (selectedTab !== 'events') return; // Only fetch when on events tab
    
    const fetchEvents = async () => {
      setEventsLoading(true);
      setEventsError(null);
      
      try {
        // Get curated events for the current city
        const cityEvents = getCuratedEvents(currentCity);
        setEvents(cityEvents);
        setLastEventUpdate(new Date());
        
      } catch (error) {
        console.error('Events fetch error:', error);
        setEventsError(error.message);
        setEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, [selectedTab, currentCity]); // Fetch when tab changes or city changes

  // Curated recurring events for each city
  const getCuratedEvents = (city) => {
    const currentMonth = new Date().getMonth();
    
    const recurringEvents = {
      'Carmel': [
        { 
          name: 'Carmel Farmers Market',
          type: 'Farmers Market',
          day: 'Saturday',
          time: '8:00 AM - 11:30 AM',
          location: 'Carter Green, Carmel',
          url: 'https://www.carmel.in.gov',
          source: 'City of Carmel',
          season: [4,5,6,7,8,9], // May-Oct
          description: 'Fresh produce, baked goods, and local crafts from Indiana farmers'
        },
        {
          name: 'Gazebo Concert Series',
          type: 'Live Music',
          day: 'Friday',
          time: '7:00 PM - 9:00 PM',
          location: 'Gazebo at Carmel Arts District',
          url: 'https://www.carmel.in.gov',
          source: 'City of Carmel',
          season: [5,6,7,8], // Jun-Sep
          description: 'Free outdoor concerts featuring local musicians'
        }
      ],
      'Fishers': [
        {
          name: 'Nickel Plate District Amphitheatre',
          type: 'Live Music',
          day: 'Saturday',
          time: '7:00 PM',
          location: 'Nickel Plate District',
          url: 'https://www.playinfishers.com',
          source: 'City of Fishers',
          season: [5,6,7,8],
          description: 'Summer concert series at the outdoor amphitheatre'
        },
        {
          name: 'Fishers Farmers Market',
          type: 'Farmers Market',
          day: 'Saturday',
          time: '8:00 AM - 12:00 PM',
          location: 'Fishers Municipal Complex',
          url: 'https://www.fishers.in.us',
          source: 'City of Fishers',
          season: [4,5,6,7,8,9],
          description: 'Local vendors selling fresh produce and handmade goods'
        }
      ],
      'Noblesville': [
        {
          name: 'Friday Night Live',
          type: 'Downtown Music',
          day: 'Friday',
          time: '7:00 PM - 10:00 PM',
          location: 'Federal Hill Commons',
          url: 'https://www.downtownnoblesville.com',
          source: 'Downtown Noblesville',
          season: [5,6,7,8],
          description: 'Free live music every Friday night downtown'
        },
        {
          name: 'Noblesville Farmers Market',
          type: 'Farmers Market',
          day: 'Saturday',
          time: '8:00 AM - 12:00 PM',
          location: 'Downtown Square',
          url: 'https://www.cityofnoblesville.org',
          source: 'City of Noblesville',
          season: [4,5,6,7,8,9],
          description: 'Weekly farmers market on the historic courthouse square'
        }
      ],
      'Zionsville': [
        {
          name: 'Brick Street Market',
          type: 'Arts & Shopping',
          day: 'Saturday',
          time: '9:00 AM - 4:00 PM',
          location: 'Main Street',
          url: 'https://www.zionsville-in.gov',
          source: 'Town of Zionsville',
          season: [4,5,6,7,8,9],
          description: 'Outdoor market featuring local artisans and vendors'
        },
        {
          name: 'Zionsville Farmers Market',
          type: 'Farmers Market',
          day: 'Saturday',
          time: '8:00 AM - 12:00 PM',
          location: 'Lions Park',
          url: 'https://www.zionsvillefarmersmarket.com',
          source: 'Zionsville Farmers Market',
          season: [4,5,6,7,8,9],
          description: 'Fresh local produce and handmade items'
        }
      ],
      'Westfield': [
        {
          name: 'Grand Junction Concert',
          type: 'Live Music',
          day: 'Saturday',
          time: '7:00 PM',
          location: 'Grand Junction Plaza',
          url: 'https://www.westfield.in.gov',
          source: 'City of Westfield',
          season: [5,6,7,8],
          description: 'Free outdoor summer concerts'
        },
        {
          name: 'Westfield Farmers Market',
          type: 'Farmers Market',
          day: 'Saturday',
          time: '8:00 AM - 1:00 PM',
          location: 'Grand Junction',
          url: 'https://www.westfield.in.gov',
          source: 'City of Westfield',
          season: [4,5,6,7,8,9],
          description: 'Local farmers and vendors'
        }
      ],
      'Indianapolis': [
        {
          name: 'Mass Ave Arts Walk',
          type: 'Arts & Culture',
          day: 'First Friday',
          time: '6:00 PM - 10:00 PM',
          location: 'Massachusetts Avenue',
          url: 'https://www.discovermassave.com',
          source: 'Mass Ave Arts District',
          season: [0,1,2,3,4,5,6,7,8,9,10,11], // Year-round
          description: 'Monthly art walk featuring galleries, live music, and street performers'
        },
        {
          name: 'Indianapolis City Market',
          type: 'Food & Shopping',
          day: 'Wednesday & Saturday',
          time: '8:00 AM - 3:00 PM',
          location: 'City Market Downtown',
          url: 'https://www.indycm.com',
          source: 'Indy City Market',
          season: [0,1,2,3,4,5,6,7,8,9,10,11],
          description: 'Historic market with food vendors and local goods'
        }
      ]
    };
    
    // Filter events by current season
    const cityEventsList = recurringEvents[city] || [];
    return cityEventsList.filter(event => event.season.includes(currentMonth));
  };

  const refreshEvents = async () => {
    setEventsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/events?city=${currentCity}&useCache=false`);
      const data = await response.json();
      setEvents(data.events || []);
      setLastEventUpdate(new Date(data.lastUpdated));
      setEventsCached(false);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Update page title dynamically
  useEffect(() => {
    document.title = `Hoosier Weekend Helper - ${currentCity}, Indiana`;
  }, [currentCity]);

  const getCurrentSeason = () => {
    const month = currentDate.getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  };

  const getSeasonalMaintenance = () => {
    const season = getCurrentSeason();
    const allTasks = [
      { task: 'Test your sump pump NOW', why: 'Spring rains are coming! Pour water into the pit to make sure it activates.', season: 'Spring', priority: 'HIGH', emoji: '💧' },
      { task: 'Check AC before the heat hits', why: "Indiana summers can be brutal. Make sure your AC is ready!", season: 'Spring', priority: 'HIGH', emoji: '❄️' },
      { task: 'Clean gutters and downspouts', why: 'Those beautiful Indiana trees drop TONS of leaves.', season: 'Fall', priority: 'HIGH', emoji: '🍂' },
      { task: 'Insulate outdoor faucets', why: "Remember last winter when it went from 70° to 20°? Protect those pipes!", season: 'Fall', priority: 'HIGH', emoji: '🚰' },
      { task: 'Check furnace and replace filters', why: 'Indiana winters are unpredictable. Be ready!', season: 'Fall', priority: 'HIGH', emoji: '🔥' },
      { task: 'Seal driveway cracks', why: 'Freeze-thaw cycles destroy driveways faster than you can say "Indy 500".', season: 'Spring', priority: 'MEDIUM', emoji: '🛣️' },
      { task: 'Check HVAC filters', why: "Indiana's wild weather means your system works overtime year-round.", season: 'All Year', priority: 'MEDIUM', emoji: '🌡️' },
      { task: 'Trim trees near power lines', why: 'Summer storms knock out power. Be proactive!', season: 'Summer', priority: 'MEDIUM', emoji: '🌳' }
    ];
    return allTasks.filter(task => task.season === season || task.season === 'All Year');
  };

  const getPorchWeatherAdvice = () => {
    if (!weather) return null;
    const { temp, feelsLike, condition, windSpeed } = weather;
    
    if (temp >= 65 && temp <= 78 && feelsLike >= 60 && condition === 'sunny' && windSpeed < 15) {
      return { 
        score: 10, 
        message: "PERFECT PORCH WEATHER!", 
        emoji: "🌟",
        advice: "Drop everything! This is what we wait for all year. Grab your sweet tea (or a cold one), fire up the grill, and soak it in! Peak Hoosier living right here.", 
        gradient: 'from-green-400 to-emerald-600',
        bgGradient: 'from-green-50 to-emerald-100',
        borderColor: 'border-green-400'
      };
    } else if (temp >= 55 && temp <= 85 && condition !== 'rainy' && windSpeed < 20) {
      return { 
        score: 7, 
        message: "Pretty Darn Good!", 
        emoji: "👍",
        advice: feelsLike < temp - 5 ? "Bring a light jacket - feels cooler than it looks! But definitely porch-worthy." : "Maybe grab a fan if you need it, but this is solid porch time!", 
        gradient: 'from-blue-400 to-cyan-600',
        bgGradient: 'from-blue-50 to-cyan-100',
        borderColor: 'border-blue-400'
      };
    } else if (condition === 'rainy' && temp >= 55 && temp <= 80) {
      return { 
        score: 6, 
        message: "Covered Porch Weather", 
        emoji: "🌧️",
        advice: "Rain's not gonna stop a true Hoosier! Cozy up under the awning with coffee and watch the storm roll in. Peak Midwest vibes.", 
        gradient: 'from-indigo-400 to-purple-600',
        bgGradient: 'from-indigo-50 to-purple-100',
        borderColor: 'border-indigo-400'
      };
    } else if (temp > 90) {
      return { 
        score: 4, 
        message: "Indiana Swelter Mode", 
        emoji: "🥵",
        advice: "It's that humid heat we know too well. Evening porch session with a cold drink? Sure. Afternoon? Stay inside with the AC cranked.", 
        gradient: 'from-orange-400 to-red-600',
        bgGradient: 'from-orange-50 to-red-100',
        borderColor: 'border-orange-400'
      };
    } else if (temp < 45) {
      return { 
        score: 3, 
        message: "Indoor Day", 
        emoji: "🏠",
        advice: "Too chilly for comfort. Perfect day to tackle that honey-do list! Check our maintenance tab.", 
        gradient: 'from-gray-400 to-slate-600',
        bgGradient: 'from-gray-50 to-slate-100',
        borderColor: 'border-gray-400'
      };
    } else if (windSpeed > 20) {
      return { 
        score: 4, 
        message: "Hold Onto Your Hats!", 
        emoji: "💨",
        advice: `${windSpeed} mph winds? Your porch furniture might end up in Carmel (even if you don't live there). Maybe stay inside.`, 
        gradient: 'from-slate-400 to-gray-600',
        bgGradient: 'from-slate-50 to-gray-100',
        borderColor: 'border-slate-400'
      };
    } else {
      return { 
        score: 5, 
        message: "Eh, Could Be Worse", 
        emoji: "🤷",
        advice: "Not ideal, but true Hoosiers have seen worse. Bundle up or cool down as needed!", 
        gradient: 'from-gray-400 to-slate-600',
        bgGradient: 'from-gray-50 to-slate-100',
        borderColor: 'border-gray-400'
      };
    }
  };

  const porchAdvice = getPorchWeatherAdvice();
  const cityInfo = cities.find(c => c.name === currentCity);

  if (loading || !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader className="w-16 h-16 text-yellow-500 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-700 text-xl font-bold mt-4">Loading your Hoosier weekend info...</p>
          <p className="text-gray-500 mt-2">Checking the weather and finding events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Header - Indiana Crimson & Gold */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-500 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <Sparkles className="w-10 h-10 text-yellow-300" />
                <h1 className="text-5xl md:text-6xl font-black drop-shadow-2xl">
                  Hoosier Weekend Helper
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-yellow-100 font-bold mb-2">
                {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-sm text-yellow-200 font-medium flex items-center justify-center md:justify-start gap-2">
                <span className="text-2xl">🏀</span> Your Central Indiana Weekend Companion <span className="text-2xl">🌽</span>
              </p>
            </div>
            <div className="animate-bounce">
              <Heart className="w-20 h-20 text-yellow-300 drop-shadow-2xl" fill="currentColor" />
            </div>
          </div>
          
          {/* City Selector */}
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-30">
            <p className="text-blue-300 font-bold mb-4 text-sm uppercase tracking-wider">Choose Your City</p>
            <div className="flex gap-3 flex-wrap">
              {cities.map(city => (
                <button
                  key={city.name}
                  onClick={() => setCurrentCity(city.name)}
                  className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 transform ${
                    currentCity === city.name
                      ? `bg-gradient-to-r ${city.gradient} text-white shadow-2xl scale-110 hover:scale-115`
                      : 'bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100 hover:scale-105 shadow-lg'
                  }`}
                >
                  <span className="text-xl mr-2">{city.icon}</span>
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-6 relative z-20">
        
        {/* Tab Navigation */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-2 shadow-2xl mb-8 border-4 border-white">
          <div className="flex gap-2 flex-col sm:flex-row">
            <button
              onClick={() => setSelectedTab('porch')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 text-lg flex items-center justify-center gap-2 ${
                selectedTab === 'porch'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              <Sun className="w-6 h-6" />
              Porch Weather
            </button>
            <button
              onClick={() => setSelectedTab('events')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 text-lg flex items-center justify-center gap-2 ${
                selectedTab === 'events'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              <Calendar className="w-6 h-6" />
              Weekend Events
            </button>
            <button
              onClick={() => setSelectedTab('honeydo')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 text-lg flex items-center justify-center gap-2 ${
                selectedTab === 'honeydo'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              <Wrench className="w-6 h-6" />
              Honey-Do List
            </button>
          </div>
        </div>

        {/* Porch Weather Tab */}
        {selectedTab === 'porch' && porchAdvice && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Main Score Card */}
            <div className={`bg-gradient-to-br ${porchAdvice.bgGradient} border-4 ${porchAdvice.borderColor} rounded-3xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300`}>
              <div className="text-center mb-6">
                <div className="text-8xl mb-4 animate-bounce">{porchAdvice.emoji}</div>
                <div className={`text-8xl font-black bg-gradient-to-r ${porchAdvice.gradient} bg-clip-text text-transparent mb-4 drop-shadow-lg`}>
                  {porchAdvice.score}/10
                </div>
                <div className="text-4xl font-black text-gray-800 mb-4">{porchAdvice.message}</div>
                <div className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
                  {porchAdvice.advice}
                </div>
              </div>
              
              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t-4 border-white">
                <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                  <div className="text-5xl font-black text-gray-800 mb-2">{weather.temp}°F</div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Current</div>
                </div>
                <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                  <div className="text-5xl font-black text-gray-800 mb-2">{weather.feelsLike}°F</div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Feels Like</div>
                </div>
                <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                  <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-5xl font-black text-gray-800 mb-2">{weather.humidity}%</div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Humidity</div>
                </div>
                <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                  <Wind className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-5xl font-black text-gray-800 mb-2">{weather.windSpeed}</div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">mph wind</div>
                </div>
              </div>
            </div>

            {/* Porch Activities */}
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-white">
              <h3 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <Coffee className="w-10 h-10 text-amber-600" />
                Perfect Porch Activities Right Now
              </h3>
              <div className="grid gap-4">
                {weather.temp >= 50 && weather.temp <= 75 && (
                  <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 border-l-8 border-orange-500 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                    <div className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2">
                      <Coffee className="w-6 h-6" /> Morning Coffee Time
                    </div>
                    <div className="text-gray-700 font-medium">Watch the neighborhood wake up with a steaming cup of joe</div>
                  </div>
                )}
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 border-l-8 border-blue-500 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                  <div className="font-bold text-xl text-gray-800 mb-2">👋 Friendly Wave Session</div>
                  <div className="text-gray-700 font-medium">Practice your Hoosier hospitality on passing neighbors!</div>
                </div>
                {weather.temp >= 60 && weather.condition !== 'rainy' && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border-l-8 border-green-500 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                    <div className="font-bold text-xl text-gray-800 mb-2">🍔 Grill Master Mode</div>
                    <div className="text-gray-700 font-medium">Fire up the grill and make the whole street jealous!</div>
                  </div>
                )}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-l-8 border-purple-500 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                  <div className="font-bold text-xl text-gray-800 mb-2">🏀 Basketball Contemplation</div>
                  <div className="text-gray-700 font-medium">Reflect on past Hoosier glory. Remember when we had Bob Knight?</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {selectedTab === 'events' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-4xl font-black text-gray-800 flex items-center gap-3 mb-2">
                    <MapPin className="w-10 h-10 text-red-600" />
                    This Weekend in {currentCity}
                  </h3>
                  <p className="text-xl text-gray-600 font-bold">{cityInfo.vibe}</p>
                </div>
                <button
                  onClick={refreshEvents}
                  disabled={eventsLoading}
                  className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-xl transform hover:scale-110"
                  title="Refresh events"
                >
                  <RefreshCw className={`w-6 h-6 text-white ${eventsLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              {lastEventUpdate && (
                <div className="flex items-center gap-3 text-sm mb-6 flex-wrap">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                    Updated: {lastEventUpdate.toLocaleTimeString()}
                  </span>
                  {eventsCached && (
                    <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">Cached</span>
                  )}
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">{getCurrentSeason()} events</span>
                </div>
              )}
              
              {eventsError && (
                <div className="mb-6 p-6 bg-red-50 border-4 border-red-200 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-red-800 text-lg">Error loading events</div>
                    <div className="text-sm text-red-600 mt-1">{eventsError}</div>
                    <div className="text-xs text-red-500 mt-2">Make sure the API server is running on port 3001</div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {eventsLoading && events.length === 0 ? (
                  <div className="text-center py-12">
                    <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-bold text-xl">Loading events...</p>
                  </div>
                ) : events.length > 0 ? (
                  events.map((event, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 border-l-8 border-yellow-500 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
                      <div className="flex justify-between items-start mb-4 gap-3">
                        <div className="font-black text-2xl text-gray-800">{event.name}</div>
                        <span className={`bg-gradient-to-r ${cityInfo.gradient} text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg whitespace-nowrap`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="space-y-2 text-lg text-gray-700 mb-4 font-medium">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          {event.day} • {event.time}
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-red-600" />
                          {event.location}
                        </div>
                        {event.description && (
                          <p className="text-gray-600 text-base mt-3 italic">{event.description}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-gray-200">
                        <span className="text-sm text-gray-500 font-bold">📰 {event.source}</span>
                        {event.url && (
                          <a 
                            href={event.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center gap-2 transform hover:scale-110 transition-all"
                          >
                            More Info <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl border-4 border-gray-200">
                    <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-3xl font-black text-gray-700 mb-2">No events found</p>
                    <p className="text-gray-600 font-medium">Check back later or try refreshing!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-8 shadow-2xl text-white border-4 border-white">
              <h4 className="text-3xl font-black mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8" /> Live Event Updates!
              </h4>
              <p className="text-xl leading-relaxed font-medium">
                Events are pulled in real-time from official city calendars, Visit Hamilton County, 
                and other trusted sources. Data refreshes every hour automatically! Always fresh, always local, always Hoosier! 🏀🌽
              </p>
            </div>
          </div>
        )}

        {/* Honey-Do Tab */}
        {selectedTab === 'honeydo' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-white">
              <h3 className="text-4xl font-black text-gray-800 mb-2 flex items-center gap-3">
                <Wrench className="w-10 h-10 text-orange-600" />
                Your {getCurrentSeason()} Home Projects
              </h3>
              <p className="text-xl text-gray-600 font-bold mb-8">
                Tackle these before you relax! Central Indiana homes need special seasonal care.
              </p>
              
              <div className="space-y-4">
                {getSeasonalMaintenance().map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border-l-8 border-orange-500 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="font-black text-xl text-gray-800">{item.task}</div>
                      </div>
                      <span className={`text-xs px-4 py-2 rounded-full font-black ${
                        item.priority === 'HIGH' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-yellow-400 text-gray-800'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium text-lg">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl text-white border-4 border-white">
              <h4 className="text-3xl font-black mb-4 flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                Current Temp: {weather.temp}°F - {getCurrentSeason()} Wisdom
              </h4>
              <p className="text-xl leading-relaxed mb-4 font-medium">
                Living in Central Indiana means dealing with wild weather! 
                {getCurrentSeason() === 'Spring' && " Spring means sump pump season and sudden storms."}
                {getCurrentSeason() === 'Summer' && " Summer heat and humidity test your AC."}
                {getCurrentSeason() === 'Fall' && " Fall is prep time - gutters, furnace, and winterizing."}
                {getCurrentSeason() === 'Winter' && " Winter freeze-thaw cycles are brutal on everything."}
              </p>
              <ul className="space-y-3 text-lg font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-300 font-black text-2xl">→</span>
                  <span><strong className="text-yellow-300">Sump pumps are LIFE</strong> - Test twice yearly, especially before spring</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-300 font-black text-2xl">→</span>
                  <span><strong className="text-yellow-300">Weather swings</strong> - 70° one day, 30° the next is normal here</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-300 font-black text-2xl">→</span>
                  <span><strong className="text-yellow-300">Tree roots</strong> - Those mature trees? Watch your sewer lines!</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl p-8 shadow-2xl border-4 border-orange-300">
              <h4 className="text-2xl font-black text-gray-800 mb-3">Reward Yourself! 🎉</h4>
              <p className="text-gray-700 text-lg font-medium">
                After you finish that project, head to a local hardware store, grab a victory treat at a coffee shop, 
                then check out this weekend's events tab. You've earned it, Hoosier!
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 space-y-3 pb-8">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-8 shadow-2xl inline-block border-4 border-white">
            <p className="text-2xl font-black text-gray-800 mb-3">Made with ❤️ for Central Indiana homeowners</p>
            <p className="text-base text-gray-600 mb-4 font-bold">Carmel • Fishers • Noblesville • Zionsville • Westfield • Indianapolis</p>
            <div className="text-sm text-gray-500 space-y-2 pt-4 border-t-2 border-gray-200 font-medium">
              <p>🌤️ Live weather updates every 10 minutes</p>
              <p>📅 Events refresh hourly from official sources</p>
              <p className="text-red-600 font-black text-lg mt-3">🏀 Go Hoosiers! 🌽 Brought to you by: <a href="https://raptorroofing.com">Raptor Roofing</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoosierWeekendHelper;
