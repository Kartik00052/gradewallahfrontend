import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import { useAuth } from './AuthContext';

const progressSteps = ['Login', 'Signup', 'Onboarding'];

export default function AuthScreen() {
  const { user, completeOnboarding } = useAuth();
  const [step, setStep] = useState('login');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});

  const progress = step === 'login' ? 5 : step === 'signup' ? 25 : onboardingStep === 1 ? 45 : 75;

  const handleSignupSuccess = useCallback(() => {
    setStep('onboarding');
    setOnboardingStep(1);
  }, []);

  const handleOnboardingNext = useCallback((data) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
    setOnboardingStep(2);
  }, []);

  const handleOnboardingSubmit = useCallback((data) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
    completeOnboarding();
  }, [completeOnboarding]);

  const handleSwitch = useCallback((target) => {
    setStep(target);
    setOnboardingStep(1);
    setOnboardingData({});
  }, []);

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <motion.div
          className="auth-brand"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          <span className="auth-brand-icon">🎓</span>
          <h1 className="auth-brand-title">Gradewallah</h1>
          <p className="auth-brand-desc">Your academic companion</p>
        </motion.div>

        <div className="auth-card">
          <div className="auth-progress-bar">
            <motion.div
              className="auth-progress-fill"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>

          <div className="auth-step-indicators">
            {(step === 'login' || step === 'signup' ? ['Sign In', 'Sign Up'] : ['Basic Info', 'Details']).map((label, i) => {
              const activeIndex = step === 'onboarding' ? onboardingStep - 1 : (step === 'login' ? 0 : 1);
              return (
                <div key={label} className={`auth-step-dot ${i <= activeIndex ? 'done' : ''} ${i === activeIndex ? 'current' : ''}`}>
                  <motion.div
                    className="auth-step-circle"
                    animate={i <= activeIndex ? { scale: 1, backgroundColor: 'var(--primary)' } : { scale: 0.85, backgroundColor: 'var(--border)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {i < activeIndex ? '✓' : i + 1}
                  </motion.div>
                  <span className="auth-step-label">{label}</span>
                </div>
              );
            })}
          </div>

          <div className="auth-content">
            <AnimatePresence mode="wait">
              {step === 'login' && (
                <LoginForm key="login" onSwitch={handleSwitch} />
              )}
              {step === 'signup' && (
                <SignupForm key="signup" onSwitch={handleSwitch} onSuccess={handleSignupSuccess} />
              )}
              {step === 'onboarding' && onboardingStep === 1 && (
                <OnboardingStep1
                  key="onboard1"
                  data={onboardingData}
                  onNext={handleOnboardingNext}
                />
              )}
              {step === 'onboarding' && onboardingStep === 2 && (
                <OnboardingStep2
                  key="onboard2"
                  data={onboardingData}
                  onBack={() => setOnboardingStep(1)}
                  onSubmit={handleOnboardingSubmit}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
