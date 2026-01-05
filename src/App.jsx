import React, { useState } from 'react';
import { Calendar, Brain, BookOpen, Home, Sparkles, Download, RefreshCw, School, Clock, Target, ArrowLeft, Users, Bell, Briefcase, Dumbbell, Code, Coffee, TrendingUp, AlertCircle, CheckCircle, Heart } from 'lucide-react';

const NEPTimetableGenerator = () => {
  const [view, setView] = useState('home');
  const [schoolFormData, setSchoolFormData] = useState({
    grade: '9',
    stream: 'science',
    schoolType: 'cbse',
    startTime: '08:00',
    endTime: '15:00',
    includeCoCurricular: true,
    includeVocational: true
  });
  
  const [personalFormData, setPersonalFormData] = useState({
    userType: 'college',
    name: '',
    collegeName: '',
    collegeStartTime: '09:00',
    collegeEndTime: '16:00',
    collegeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    courses: [],
    physicalActivities: [],
    sideIncome: [],
    studyHoursPerDay: '3',
    sleepTime: '23:00',
    wakeTime: '06:30',
    priorityGoals: [],
    breakPreference: '30',
    reminders: true
  });
  
  const [schoolTimetable, setSchoolTimetable] = useState(null);
  const [personalTimetable, setPersonalTimetable] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const NEP_SUBJECTS = {
    core: {
      science: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi/Regional Language'],
      commerce: ['Mathematics', 'Accountancy', 'Business Studies', 'Economics', 'English', 'Hindi/Regional Language'],
      arts: ['History', 'Political Science', 'Geography', 'Economics', 'English', 'Hindi/Regional Language']
    },
    multidisciplinary: ['Environmental Science', 'Computer Science', 'Critical Thinking', 'Data Science Basics', 'Philosophy', 'Psychology'],
    skill: ['Coding', 'Design Thinking', 'Financial Literacy', 'Communication Skills', 'Digital Literacy', 'Public Speaking'],
    vocational: ['AI/ML Basics', 'Electronics', 'Agriculture', 'Tourism', 'Health & Wellness', 'Art & Craft', 'Entrepreneurship', 'Robotics'],
    holistic: ['Physical Education', 'Yoga & Meditation', 'Music', 'Arts', 'Community Service', 'Drama', 'Dance']
  };

  const COURSE_OPTIONS = ['Web Development', 'Data Science', 'Digital Marketing', 'Graphic Design', 'App Development', 'Cloud Computing', 'Cybersecurity', 'UI/UX Design'];
  const ACTIVITY_OPTIONS = ['Gym', 'Yoga', 'Running', 'Swimming', 'Cycling', 'Sports', 'Martial Arts', 'Dance'];
  const INCOME_OPTIONS = ['Freelancing', 'Tutoring', 'Content Writing', 'Part-time Job', 'Internship', 'YouTube/Content Creation', 'Stock Trading', 'Online Teaching'];
  const GOAL_OPTIONS = ['Academic Excellence', 'Skill Development', 'Career Growth', 'Health & Fitness', 'Financial Independence', 'Work-Life Balance'];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#111827',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    maxWidth: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    textCenter: {
      textAlign: 'center'
    },
    heading: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px'
    },
    subheading: {
      fontSize: '20px',
      color: '#9CA3AF',
      marginBottom: '48px'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '32px',
      marginBottom: '48px'
    },
    card: {
      backgroundColor: '#1F2937',
      borderRadius: '24px',
      padding: '32px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: '2px solid #374151'
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
    },
    iconCircle: {
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px'
    },
    cardTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px'
    },
    cardText: {
      color: '#9CA3AF',
      marginBottom: '24px',
      fontSize: '14px',
      lineHeight: '1.5'
    },
    button: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      color: 'white'
    },
    buttonPrimary: {
      background: 'linear-gradient(to right, #6366F1, #8B5CF6)'
    },
    buttonSecondary: {
      background: 'linear-gradient(to right, #8B5CF6, #EC4899)'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#D1D5DB',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#374151',
      border: '1px solid #4B5563',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#374151',
      border: '1px solid #4B5563',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      marginRight: '8px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      color: '#D1D5DB',
      fontSize: '14px',
      cursor: 'pointer'
    },
    timetableGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginTop: '24px'
    },
    dayCard: {
      border: '1px solid #374151',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#0F172A'
    },
    dayHeader: {
      background: 'linear-gradient(to right, #6366F1, #8B5CF6)',
      color: 'white',
      padding: '12px',
      fontWeight: '600',
      textAlign: 'center'
    },
    periodCard: {
      padding: '12px',
      margin: '8px',
      borderRadius: '8px',
      border: '2px solid',
      fontSize: '12px'
    },
    periodTime: {
      fontSize: '11px',
      fontWeight: '600',
      marginBottom: '4px',
      opacity: 0.9
    },
    periodSubject: {
      fontWeight: '500',
      marginBottom: '4px',
      fontSize: '13px'
    },
    periodApproach: {
      fontSize: '11px',
      opacity: 0.75
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#818CF8',
      background: 'none',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '24px',
      padding: '8px 0'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginBottom: '24px'
    },
    smallButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    tagButton: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: '2px solid',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      marginRight: '8px',
      marginBottom: '8px',
      display: 'inline-block'
    },
    suggestionCard: {
      padding: '16px',
      borderRadius: '8px',
      border: '2px solid',
      marginBottom: '16px'
    },
    flexRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    legend: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      padding: '16px',
      backgroundColor: 'rgba(55, 65, 81, 0.5)',
      borderRadius: '8px',
      marginBottom: '24px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#D1D5DB'
    },
    legendBox: {
      width: '16px',
      height: '16px',
      borderRadius: '4px',
      border: '1px solid'
    },
    infoBox: {
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid',
      marginTop: '24px'
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      core: { bg: 'rgba(37, 99, 235, 0.3)', border: '#3B82F6', text: '#93C5FD' },
      multidisciplinary: { bg: 'rgba(139, 92, 246, 0.3)', border: '#8B5CF6', text: '#C4B5FD' },
      skill: { bg: 'rgba(34, 197, 94, 0.3)', border: '#22C55E', text: '#86EFAC' },
      vocational: { bg: 'rgba(249, 115, 22, 0.3)', border: '#F97316', text: '#FDBA74' },
      holistic: { bg: 'rgba(236, 72, 153, 0.3)', border: '#EC4899', text: '#F9A8D4' },
      break: { bg: 'rgba(75, 85, 99, 0.5)', border: '#6B7280', text: '#9CA3AF' },
      college: { bg: 'rgba(99, 102, 241, 0.3)', border: '#6366F1', text: '#A5B4FC' },
      course: { bg: 'rgba(37, 99, 235, 0.3)', border: '#3B82F6', text: '#93C5FD' },
      routine: { bg: 'rgba(234, 179, 8, 0.3)', border: '#EAB308', text: '#FDE047' },
      physical: { bg: 'rgba(34, 197, 94, 0.3)', border: '#22C55E', text: '#86EFAC' },
      income: { bg: 'rgba(249, 115, 22, 0.3)', border: '#F97316', text: '#FDBA74' },
      leisure: { bg: 'rgba(139, 92, 246, 0.3)', border: '#8B5CF6', text: '#C4B5FD' },
      study: { bg: 'rgba(6, 182, 212, 0.3)', border: '#06B6D4', text: '#67E8F9' },
      sleep: { bg: 'rgba(75, 85, 99, 0.5)', border: '#6B7280', text: '#D1D5DB' },
      meal: { bg: 'rgba(239, 68, 68, 0.3)', border: '#EF4444', text: '#FCA5A5' }
    };
    return colors[type] || colors.break;
  };

  const timeToDecimal = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
  };

  const formatTime = (time) => {
    const hours = Math.floor(time) % 24;
    const minutes = Math.round((time - Math.floor(time)) * 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
  };

  const hasOverlap = (start1, end1, start2, end2) => {
    return (start1 < end2 && end1 > start2);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getTeachingApproach = (type) => {
    const approaches = {
      core: 'Conceptual Understanding',
      multidisciplinary: 'Integrated Learning',
      skill: 'Hands-on Practice',
      vocational: 'Experiential Learning',
      holistic: 'Activity-based',
      break: 'Free time'
    };
    return approaches[type] || 'Standard';
  };

  const downloadTimetablePDF = (type) => {
    const timetable = type === 'school' ? schoolTimetable : personalTimetable;
    if (!timetable) return;

    let html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Timetable</title>';
    html += '<style>';
    html += 'body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; margin: 0; }';
    html += 'h1 { color: #333; text-align: center; margin-bottom: 30px; }';
    html += '.info { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }';
    html += '.day { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; page-break-inside: avoid; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }';
    html += '.day-title { background: linear-gradient(to right, #6366F1, #8B5CF6); color: white; padding: 12px; border-radius: 6px; margin-bottom: 15px; font-size: 18px; font-weight: bold; }';
    html += '.period { padding: 12px; margin: 8px 0; border-left: 4px solid #6366F1; background: #f9fafb; border-radius: 4px; }';
    html += '.time { font-weight: bold; color: #6366F1; margin-bottom: 5px; font-size: 14px; }';
    html += '.subject { font-size: 16px; font-weight: 600; margin-bottom: 3px; color: #1f2937; }';
    html += '.approach { font-size: 13px; color: #666; }';
    html += '.btn-container { text-align: center; margin: 30px 0; }';
    html += '.print-btn { background: linear-gradient(to right, #6366F1, #8B5CF6); color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }';
    html += '.print-btn:hover { opacity: 0.9; }';
    html += '@media print { body { background: white; } .btn-container { display: none; } }';
    html += '</style></head><body>';

    if (type === 'school') {
      html += '<h1>📚 School Timetable</h1>';
      html += '<div class="info">';
      html += '<strong>Grade:</strong> ' + schoolFormData.grade + '<br>';
      html += '<strong>Stream:</strong> ' + schoolFormData.stream.toUpperCase() + '<br>';
      html += '<strong>Board:</strong> ' + schoolFormData.schoolType.toUpperCase() + '<br>';
      html += '<strong>Time:</strong> ' + schoolFormData.startTime + ' - ' + schoolFormData.endTime;
      html += '</div>';
    } else {
      html += '<h1>🎯 Personal Timetable</h1>';
      html += '<div class="info">';
      if (personalFormData.name) html += '<strong>Name:</strong> ' + personalFormData.name + '<br>';
      if (personalFormData.collegeName) html += '<strong>College:</strong> ' + personalFormData.collegeName + '<br>';
      html += '<strong>Sleep Schedule:</strong> ' + personalFormData.sleepTime + ' - ' + personalFormData.wakeTime + '<br>';
      html += '<strong>Study Hours:</strong> ' + personalFormData.studyHoursPerDay + ' hours/day';
      html += '</div>';
    }

    html += '<div class="btn-container"><button class="print-btn" onclick="window.print()">🖨️ Print Timetable</button></div>';

    Object.entries(timetable).forEach(([day, activities]) => {
      html += '<div class="day">';
      html += '<div class="day-title">' + day + '</div>';
      
      activities.forEach(activity => {
        const activityName = type === 'school' ? activity.subject : activity.activity;
        const approach = type === 'school' ? activity.approach : activity.description;
        
        html += '<div class="period">';
        html += '<div class="time">⏰ ' + activity.time + '</div>';
        html += '<div class="subject">' + activityName + '</div>';
        if (approach) html += '<div class="approach">' + approach + '</div>';
        html += '</div>';
      });
      
      html += '</div>';
    });

    html += '</body></html>';

    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = type === 'school' ? 'School_Timetable.html' : 'Personal_Timetable.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateSchoolTimetable = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const start = timeToDecimal(schoolFormData.startTime);
    const end = timeToDecimal(schoolFormData.endTime);
    
    const coreSubjects = shuffleArray(NEP_SUBJECTS.core[schoolFormData.stream]);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const schedule = {};
    
    days.forEach((day, dayIndex) => {
      schedule[day] = [];
      let currentTime = start;
      
      const todayCore = shuffleArray([...coreSubjects]);
      const todayMulti = shuffleArray([...NEP_SUBJECTS.multidisciplinary]);
      const todaySkill = shuffleArray([...NEP_SUBJECTS.skill]);
      const todayVocational = shuffleArray([...NEP_SUBJECTS.vocational]);
      const todayHolistic = shuffleArray([...NEP_SUBJECTS.holistic]);
      
      let coreIndex = 0, multiIndex = 0, skillIndex = 0, vocationalIndex = 0, holisticIndex = 0;
      let periodCount = 0;
      
      while (currentTime < end - 0.5) {
        let subject, type, duration;
        
        if (periodCount === 0) {
          subject = todayCore[coreIndex % todayCore.length];
          coreIndex++;
          type = 'core';
          duration = 0.75;
        }
        else if (currentTime >= start + 2 && currentTime < start + 2.5 && schedule[day].filter(p => p.type === 'break').length === 0) {
          subject = 'Short Break';
          type = 'break';
          duration = 0.25;
        }
        else if (currentTime >= start + 4 && currentTime < start + 5 && schedule[day].filter(p => p.subject.includes('Lunch')).length === 0) {
          subject = 'Lunch Break';
          type = 'break';
          duration = 0.5;
        }
        else if (day === 'Wednesday' && currentTime >= start + 5 && schedule[day].filter(p => p.type === 'holistic').length === 0) {
          subject = todayHolistic[holisticIndex % todayHolistic.length];
          holisticIndex++;
          type = 'holistic';
          duration = 1;
        }
        else if (day === 'Friday' && currentTime >= start + 5.5 && schedule[day].filter(p => p.subject === 'Physical Education').length === 0) {
          subject = 'Physical Education';
          type = 'holistic';
          duration = 1;
        }
        else if (schoolFormData.includeCoCurricular && Math.random() < 0.2 && multiIndex < todayMulti.length) {
          subject = todayMulti[multiIndex];
          multiIndex++;
          type = 'multidisciplinary';
          duration = 0.75;
        }
        else if (currentTime >= end - 2 && periodCount > 4) {
          if (schoolFormData.includeVocational && vocationalIndex < todayVocational.length && Math.random() < 0.5) {
            subject = todayVocational[vocationalIndex];
            vocationalIndex++;
            type = 'vocational';
            duration = 1;
          } else {
            subject = todaySkill[skillIndex % todaySkill.length];
            skillIndex++;
            type = 'skill';
            duration = 0.75;
          }
        }
        else {
          subject = todayCore[coreIndex % todayCore.length];
          coreIndex++;
          type = 'core';
          duration = 0.75;
        }
        
        const endTime = Math.min(currentTime + duration, end);
        if (endTime > end) break;
        
        schedule[day].push({
          time: formatTime(currentTime) + ' - ' + formatTime(endTime),
          subject: subject,
          type: type,
          approach: getTeachingApproach(type),
          startDecimal: currentTime,
          endDecimal: endTime
        });
        
        currentTime = endTime;
        periodCount++;
      }
    });
    
    setSchoolTimetable(schedule);
    setLoading(false);
  };

  const generatePersonalTimetable = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const personalSchedule = {};
    const suggestions = [];
    
    const wakeHour = timeToDecimal(personalFormData.wakeTime);
    const sleepHour = timeToDecimal(personalFormData.sleepTime);
    const collegeStartHour = timeToDecimal(personalFormData.collegeStartTime);
    const collegeEndHour = timeToDecimal(personalFormData.collegeEndTime);
    const studyHours = parseInt(personalFormData.studyHoursPerDay);
    const breakDuration = parseInt(personalFormData.breakPreference) / 60;
    
    const awakeHours = sleepHour > wakeHour ? sleepHour - wakeHour : (24 - wakeHour) + sleepHour;
    
    if (awakeHours < 16) {
      suggestions.push({
        type: 'warning',
        message: 'You are sleeping ' + Math.round((24-awakeHours)) + ' hours! Consider waking earlier to maximize productivity',
        icon: AlertCircle
      });
    } else if (awakeHours > 18) {
      suggestions.push({
        type: 'warning',
        message: 'Only ' + Math.round(24-awakeHours) + ' hours of sleep? Your body needs 7-8 hours!',
        icon: AlertCircle
      });
    } else {
      suggestions.push({
        type: 'success',
        message: 'Perfect! ' + Math.round(24-awakeHours) + ' hours of sleep is ideal',
        icon: CheckCircle
      });
    }
    
    if (personalFormData.courses.length === 0) {
      suggestions.push({
        type: 'info',
        message: 'Adding an online course can accelerate your career growth!',
        icon: TrendingUp
      });
    }
    
    if (personalFormData.physicalActivities.length === 0) {
      suggestions.push({
        type: 'warning',
        message: 'No physical activity scheduled! Even 30 minutes daily can boost productivity',
        icon: AlertCircle
      });
    }
    
    days.forEach((day, dayIndex) => {
      personalSchedule[day] = [];
      const isCollegeDay = personalFormData.collegeDays.includes(day);
      
      const addActivity = (time, duration, activity, type, description, priority, reminder) => {
        const start = time;
        const end = time + duration;
        
        const hasConflict = personalSchedule[day].some(existing => 
          hasOverlap(start, end, existing.startDecimal, existing.endDecimal)
        );
        
        if (!hasConflict && start >= wakeHour && end <= (sleepHour > wakeHour ? sleepHour : 24)) {
          personalSchedule[day].push({
            time: formatTime(start) + ' - ' + formatTime(end),
            activity: activity,
            type: type,
            description: description,
            priority: priority,
            reminder: reminder && personalFormData.reminders,
            startDecimal: start,
            endDecimal: end
          });
          return true;
        }
        return false;
      };
      
      let currentTime = wakeHour;
      
      addActivity(currentTime, 0.5, 'Wake Up & Freshen Up', 'routine', 'Start fresh!', 'high', true);
      currentTime += 0.5;
      
      if (personalFormData.physicalActivities.length > 0 && dayIndex % 2 === 0) {
        const activity = personalFormData.physicalActivities[dayIndex % personalFormData.physicalActivities.length];
        if (addActivity(currentTime, 1, activity, 'physical', 'Morning boost!', 'medium', true)) {
          currentTime += 1;
        }
      }
      
      addActivity(currentTime, 0.5, 'Breakfast', 'meal', 'Fuel up!', 'high', true);
      currentTime += 0.5;
      
      if (isCollegeDay) {
        if (currentTime < collegeStartHour - 0.5) {
          addActivity(currentTime, collegeStartHour - currentTime - 0.5, 'Morning Study', 'study', 'Review', 'medium', true);
        }
        
        addActivity(collegeStartHour, collegeEndHour - collegeStartHour, personalFormData.collegeName || 'College', 'college', 'Focus mode', 'high', true);
        currentTime = collegeEndHour;
      } else {
        if (personalFormData.sideIncome.length > 0) {
          const income = personalFormData.sideIncome[dayIndex % personalFormData.sideIncome.length];
          addActivity(currentTime, 3, income, 'income', 'Build empire!', 'high', true);
          currentTime += 3;
        } else if (personalFormData.courses.length > 0) {
          const course = personalFormData.courses[dayIndex % personalFormData.courses.length];
          addActivity(currentTime, 2.5, course, 'course', 'Skill time!', 'high', true);
          currentTime += 2.5;
        }
      }
      
      addActivity(currentTime, 1, 'Lunch & Rest', 'meal', 'Recharge!', 'high', true);
      currentTime += 1;
      
      if (isCollegeDay) {
        if (personalFormData.courses.length > 0 && currentTime < sleepHour - 5) {
          const course = personalFormData.courses[(dayIndex + 1) % personalFormData.courses.length];
          if (addActivity(currentTime, 1.5, course, 'course', 'Learn new!', 'medium', true)) {
            currentTime += 1.5;
          }
        }
        
        addActivity(currentTime, breakDuration, 'Break Time', 'break', 'Relax', 'low', false);
        currentTime += breakDuration;
        
        if (studyHours > 0 && currentTime < sleepHour - 4) {
          addActivity(currentTime, studyHours / 2, 'Study 1', 'study', 'Focus', 'high', true);
          currentTime += studyHours / 2;
          
          addActivity(currentTime, 0.25, 'Quick Break', 'break', 'Stretch!', 'low', false);
          currentTime += 0.25;
          
          addActivity(currentTime, studyHours / 2, 'Study 2', 'study', 'Practice', 'medium', true);
          currentTime += studyHours / 2;
        }
        
        if (personalFormData.sideIncome.length > 0 && currentTime < sleepHour - 3) {
          const income = personalFormData.sideIncome[0];
          if (addActivity(currentTime, 1.5, income, 'income', 'Hustle', 'medium', true)) {
            currentTime += 1.5;
          }
        }
      } else {
        if (personalFormData.sideIncome.length > 0 && currentTime < sleepHour - 4) {
          const income = personalFormData.sideIncome[0];
          if (addActivity(currentTime, 2, income, 'income', 'Weekend work!', 'high', true)) {
            currentTime += 2;
          }
        }
      }
      
      if (currentTime < sleepHour - 2) {
        addActivity(currentTime, 1, 'Dinner', 'meal', 'Family time', 'high', true);
        currentTime += 1;
      }
      
      if (personalFormData.physicalActivities.length > 0 && !isCollegeDay && dayIndex % 3 === 0 && currentTime < sleepHour - 2) {
        const activity = personalFormData.physicalActivities[0];
        if (addActivity(currentTime, 1, activity, 'physical', 'Evening workout', 'medium', true)) {
          currentTime += 1;
        }
      }
      
      if (currentTime < sleepHour - 0.5) {
        const leisureTime = sleepHour - currentTime - 0.5;
        if (leisureTime > 0) {
          addActivity(currentTime, leisureTime, 'Leisure Time', 'leisure', 'Relax & unwind', 'low', false);
          currentTime += leisureTime;
        }
      }
      
      addActivity(currentTime, 0.5, 'Sleep Prep', 'routine', 'Wind down', 'high', true);
    });
    
    setAiSuggestions(suggestions);
    setPersonalTimetable(personalSchedule);
    setLoading(false);
  };

  const toggleArrayItem = (array, item) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };

  const renderHome = () => (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.textCenter}>
          <h1 style={styles.heading}>
            <Sparkles size={48} style={{ display: 'inline', marginRight: '16px', color: '#8B5CF6' }} />
            Smart Timetable Generator
          </h1>
          <p style={styles.subheading}>
            AI-powered scheduling for students following NEP 2020 & busy college students
          </p>
        </div>

        <div style={styles.cardGrid}>
          <div 
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => setView('school-form')}
          >
            <div style={{...styles.iconCircle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <School size={48} color="white" />
            </div>
            <h2 style={styles.cardTitle}>School Timetable</h2>
            <p style={styles.cardText}>
              Generate NEP 2020 compliant timetables with core subjects, multidisciplinary learning, 
              vocational skills, and holistic development activities.
            </p>
            <button style={{...styles.button, ...styles.buttonPrimary}}>
              Create School Schedule
            </button>
          </div>

          <div 
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => setView('personal-form')}
          >
            <div style={{...styles.iconCircle, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
              <Brain size={48} color="white" />
            </div>
            <h2 style={styles.cardTitle}>Personal Timetable</h2>
            <p style={styles.cardText}>
              Balance college, online courses, side hustles, fitness, and personal life. 
              Get AI suggestions for optimal productivity and work-life balance.
            </p>
            <button style={{...styles.button, ...styles.buttonSecondary}}>
              Create Personal Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchoolForm = () => (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <button style={styles.backButton} onClick={() => setView('home')}>
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div style={styles.card}>
          <h2 style={{...styles.cardTitle, textAlign: 'center', marginBottom: '32px'}}>
            School Timetable Configuration
          </h2>

          <div style={styles.formGroup}>
            <label style={styles.label}>Grade/Class</label>
            <select 
              style={styles.select}
              value={schoolFormData.grade}
              onChange={(e) => setSchoolFormData({...schoolFormData, grade: e.target.value})}
            >
              {[9, 10, 11, 12].map(g => (
                <option key={g} value={g}>Class {g}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Stream (for 11-12)</label>
            <select 
              style={styles.select}
              value={schoolFormData.stream}
              onChange={(e) => setSchoolFormData({...schoolFormData, stream: e.target.value})}
            >
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts/Humanities</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Board</label>
            <select 
              style={styles.select}
              value={schoolFormData.schoolType}
              onChange={(e) => setSchoolFormData({...schoolFormData, schoolType: e.target.value})}
            >
              <option value="cbse">CBSE</option>
              <option value="icse">ICSE</option>
              <option value="state">State Board</option>
            </select>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>School Start Time</label>
              <input 
                type="time" 
                style={styles.input}
                value={schoolFormData.startTime}
                onChange={(e) => setSchoolFormData({...schoolFormData, startTime: e.target.value})}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>School End Time</label>
              <input 
                type="time" 
                style={styles.input}
                value={schoolFormData.endTime}
                onChange={(e) => setSchoolFormData({...schoolFormData, endTime: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                style={styles.checkbox}
                checked={schoolFormData.includeCoCurricular}
                onChange={(e) => setSchoolFormData({...schoolFormData, includeCoCurricular: e.target.checked})}
              />
              Include Co-curricular Activities
            </label>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                style={styles.checkbox}
                checked={schoolFormData.includeVocational}
                onChange={(e) => setSchoolFormData({...schoolFormData, includeVocational: e.target.checked})}
              />
              Include Vocational Training
            </label>
          </div>

          <button 
            style={{...styles.button, ...styles.buttonPrimary, marginTop: '24px'}}
            onClick={generateSchoolTimetable}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Timetable'}
          </button>
        </div>

        {schoolTimetable && renderSchoolTimetable()}
      </div>
    </div>
  );

  const renderPersonalForm = () => (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <button style={styles.backButton} onClick={() => setView('home')}>
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div style={styles.card}>
          <h2 style={{...styles.cardTitle, textAlign: 'center', marginBottom: '32px'}}>
            Personal Timetable Configuration
          </h2>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Name</label>
              <input 
                type="text" 
                style={styles.input}
                placeholder="Enter your name"
                value={personalFormData.name}
                onChange={(e) => setPersonalFormData({...personalFormData, name: e.target.value})}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>College/University Name</label>
              <input 
                type="text" 
                style={styles.input}
                placeholder="Your college"
                value={personalFormData.collegeName}
                onChange={(e) => setPersonalFormData({...personalFormData, collegeName: e.target.value})}
              />
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>College Start Time</label>
              <input 
                type="time" 
                style={styles.input}
                value={personalFormData.collegeStartTime}
                onChange={(e) => setPersonalFormData({...personalFormData, collegeStartTime: e.target.value})}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>College End Time</label>
              <input 
                type="time" 
                style={styles.input}
                value={personalFormData.collegeEndTime}
                onChange={(e) => setPersonalFormData({...personalFormData, collegeEndTime: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>College Days</label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px'}}>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <button
                  key={day}
                  style={{
                    ...styles.tagButton,
                    backgroundColor: personalFormData.collegeDays.includes(day) ? '#6366F1' : 'transparent',
                    borderColor: personalFormData.collegeDays.includes(day) ? '#6366F1' : '#4B5563',
                    color: personalFormData.collegeDays.includes(day) ? 'white' : '#D1D5DB'
                  }}
                  onClick={() => setPersonalFormData({
                    ...personalFormData, 
                    collegeDays: toggleArrayItem(personalFormData.collegeDays, day)
                  })}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Online Courses/Skills Learning</label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px'}}>
              {COURSE_OPTIONS.map(course => (
                <button
                  key={course}
                  style={{
                    ...styles.tagButton,
                    backgroundColor: personalFormData.courses.includes(course) ? '#3B82F6' : 'transparent',
                    borderColor: personalFormData.courses.includes(course) ? '#3B82F6' : '#4B5563',
                    color: personalFormData.courses.includes(course) ? 'white' : '#D1D5DB'
                  }}
                  onClick={() => setPersonalFormData({
                    ...personalFormData, 
                    courses: toggleArrayItem(personalFormData.courses, course)
                  })}
                >
                  {course}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Physical Activities</label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px'}}>
              {ACTIVITY_OPTIONS.map(activity => (
                <button
                  key={activity}
                  style={{
                    ...styles.tagButton,
                    backgroundColor: personalFormData.physicalActivities.includes(activity) ? '#22C55E' : 'transparent',
                    borderColor: personalFormData.physicalActivities.includes(activity) ? '#22C55E' : '#4B5563',
                    color: personalFormData.physicalActivities.includes(activity) ? 'white' : '#D1D5DB'
                  }}
                  onClick={() => setPersonalFormData({
                    ...personalFormData, 
                    physicalActivities: toggleArrayItem(personalFormData.physicalActivities, activity)
                  })}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Side Income/Hustles</label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px'}}>
              {INCOME_OPTIONS.map(income => (
                <button
                  key={income}
                  style={{
                    ...styles.tagButton,
                    backgroundColor: personalFormData.sideIncome.includes(income) ? '#F97316' : 'transparent',
                    borderColor: personalFormData.sideIncome.includes(income) ? '#F97316' : '#4B5563',
                    color: personalFormData.sideIncome.includes(income) ? 'white' : '#D1D5DB'
                  }}
                  onClick={() => setPersonalFormData({
                    ...personalFormData, 
                    sideIncome: toggleArrayItem(personalFormData.sideIncome, income)
                  })}
                >
                  {income}
                </button>
              ))}
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Study Hours/Day</label>
              <select 
                style={styles.select}
                value={personalFormData.studyHoursPerDay}
                onChange={(e) => setPersonalFormData({...personalFormData, studyHoursPerDay: e.target.value})}
              >
                {[1, 2, 3, 4, 5, 6].map(h => (
                  <option key={h} value={h}>{h} hours</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Sleep Time</label>
              <input 
                type="time" 
                style={styles.input}
                value={personalFormData.sleepTime}
                onChange={(e) => setPersonalFormData({...personalFormData, sleepTime: e.target.value})}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Wake Time</label>
              <input 
                type="time" 
                style={styles.input}
                value={personalFormData.wakeTime}
                onChange={(e) => setPersonalFormData({...personalFormData, wakeTime: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Break Preference (minutes)</label>
            <select 
              style={styles.select}
              value={personalFormData.breakPreference}
              onChange={(e) => setPersonalFormData({...personalFormData, breakPreference: e.target.value})}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                style={styles.checkbox}
                checked={personalFormData.reminders}
                onChange={(e) => setPersonalFormData({...personalFormData, reminders: e.target.checked})}
              />
              Enable Activity Reminders
            </label>
          </div>

          <button 
            style={{...styles.button, ...styles.buttonSecondary, marginTop: '24px'}}
            onClick={generatePersonalTimetable}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Personal Timetable'}
          </button>
        </div>

        {personalTimetable && renderPersonalTimetable()}
      </div>
    </div>
  );

  const renderSchoolTimetable = () => (
    <div style={{marginTop: '48px'}}>
      <div style={styles.buttonGroup}>
        <button 
          style={{...styles.smallButton, background: 'linear-gradient(to right, #6366F1, #8B5CF6)', color: 'white'}}
          onClick={() => downloadTimetablePDF('school')}
        >
          <Download size={18} />
          Download PDF
        </button>
        <button 
          style={{...styles.smallButton, backgroundColor: '#374151', color: 'white'}}
          onClick={generateSchoolTimetable}
        >
          <RefreshCw size={18} />
          Regenerate
        </button>
      </div>

      <div style={styles.legend}>
        {['core', 'multidisciplinary', 'skill', 'vocational', 'holistic', 'break'].map(type => {
          const color = getTypeColor(type);
          return (
            <div key={type} style={styles.legendItem}>
              <div style={{...styles.legendBox, backgroundColor: color.bg, borderColor: color.border}} />
              <span style={{textTransform: 'capitalize'}}>{type}</span>
            </div>
          );
        })}
      </div>

      <div style={styles.timetableGrid}>
        {Object.entries(schoolTimetable).map(([day, periods]) => (
          <div key={day} style={styles.dayCard}>
            <div style={styles.dayHeader}>{day}</div>
            <div>
              {periods.map((period, idx) => {
                const color = getTypeColor(period.type);
                return (
                  <div 
                    key={idx}
                    style={{
                      ...styles.periodCard,
                      backgroundColor: color.bg,
                      borderColor: color.border,
                      color: color.text
                    }}
                  >
                    <div style={styles.periodTime}>{period.time}</div>
                    <div style={styles.periodSubject}>{period.subject}</div>
                    <div style={styles.periodApproach}>{period.approach}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{...styles.infoBox, borderColor: '#3B82F6', color: '#93C5FD'}}>
        <div style={styles.flexRow}>
          <Brain size={24} />
          <div>
            <strong style={{display: 'block', marginBottom: '8px', color: 'white'}}>
              NEP 2020 Compliance
            </strong>
            <p style={{margin: 0, fontSize: '14px', lineHeight: '1.6'}}>
              This timetable follows NEP 2020 guidelines with a balanced mix of core academics, 
              multidisciplinary learning, skill development, vocational training, and holistic development activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalTimetable = () => (
    <div style={{marginTop: '48px'}}>
      <div style={styles.buttonGroup}>
        <button 
          style={{...styles.smallButton, background: 'linear-gradient(to right, #8B5CF6, #EC4899)', color: 'white'}}
          onClick={() => downloadTimetablePDF('personal')}
        >
          <Download size={18} />
          Download PDF
        </button>
        <button 
          style={{...styles.smallButton, backgroundColor: '#374151', color: 'white'}}
          onClick={generatePersonalTimetable}
        >
          <RefreshCw size={18} />
          Regenerate
        </button>
      </div>

      {aiSuggestions.length > 0 && (
        <div style={{marginBottom: '24px'}}>
          <h3 style={{color: 'white', marginBottom: '16px', fontSize: '20px'}}>
            <Sparkles size={20} style={{display: 'inline', marginRight: '8px'}} />
            AI Suggestions
          </h3>
          {aiSuggestions.map((suggestion, idx) => {
            const Icon = suggestion.icon;
            const colorMap = {
              success: { border: '#22C55E', bg: 'rgba(34, 197, 94, 0.2)', text: '#86EFAC' },
              warning: { border: '#F97316', bg: 'rgba(249, 115, 22, 0.2)', text: '#FDBA74' },
              info: { border: '#3B82F6', bg: 'rgba(59, 130, 246, 0.2)', text: '#93C5FD' }
            };
            const color = colorMap[suggestion.type];
            return (
              <div 
                key={idx}
                style={{
                  ...styles.suggestionCard,
                  borderColor: color.border,
                  backgroundColor: color.bg,
                  color: color.text
                }}
              >
                <div style={styles.flexRow}>
                  <Icon size={20} />
                  <span>{suggestion.message}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={styles.legend}>
        {['college', 'course', 'study', 'physical', 'income', 'meal', 'routine', 'leisure', 'break'].map(type => {
          const color = getTypeColor(type);
          return (
            <div key={type} style={styles.legendItem}>
              <div style={{...styles.legendBox, backgroundColor: color.bg, borderColor: color.border}} />
              <span style={{textTransform: 'capitalize'}}>{type}</span>
            </div>
          );
        })}
      </div>

      <div style={styles.timetableGrid}>
        {Object.entries(personalTimetable).map(([day, activities]) => (
          <div key={day} style={styles.dayCard}>
            <div style={styles.dayHeader}>{day}</div>
            <div>
              {activities.map((activity, idx) => {
                const color = getTypeColor(activity.type);
                return (
                  <div 
                    key={idx}
                    style={{
                      ...styles.periodCard,
                      backgroundColor: color.bg,
                      borderColor: color.border,
                      color: color.text
                    }}
                  >
                    <div style={styles.periodTime}>
                      {activity.time}
                      {activity.reminder && <Bell size={10} style={{display: 'inline', marginLeft: '4px'}} />}
                    </div>
                    <div style={styles.periodSubject}>{activity.activity}</div>
                    {activity.description && (
                      <div style={styles.periodApproach}>{activity.description}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{...styles.infoBox, borderColor: '#8B5CF6', color: '#C4B5FD'}}>
        <div style={styles.flexRow}>
          <Heart size={24} />
          <div>
            <strong style={{display: 'block', marginBottom: '8px', color: 'white'}}>
              Work-Life Balance Tips
            </strong>
            <p style={{margin: 0, fontSize: '14px', lineHeight: '1.6'}}>
              Your schedule balances productivity with rest. Remember: consistency is key! 
              Stick to your sleep schedule, take breaks seriously, and adjust as needed based on your energy levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {view === 'home' && renderHome()}
      {view === 'school-form' && renderSchoolForm()}
      {view === 'personal-form' && renderPersonalForm()}
    </div>
  );
};

export default NEPTimetableGenerator;