import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { auth } from '@/lib/mockSupabase';
import { UserType } from '@/types/kr-platform';

/**
 * Epic A: Sign Up Page (Bootstrap Style)
 * - User Type Selection (Individual, Business, Enterprise)
 * - Email/Password Registration
 * - OAuth Sign Up
 */
const SignUp: FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await auth.signUp(email, password, {
        userType,
        firstName,
        lastName,
        phone,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        if (userType === 'business' || userType === 'enterprise') {
          navigate(ROUTES.ONBOARDING.ROOT);
        } else {
          navigate(ROUTES.CUSTOMER.MY_PAGE);
        }
      }
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider: 'kakao' | 'google') => {
    try {
      const { error } = await auth.signInWithOAuth(provider);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('OAuth 회원가입에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7 my-5 custom-login-box">
          {/* Header */}
          <h1 className="display-4 text-center mb-3">회원가입</h1>
          <p className="text-muted text-center mb-5">
            Ruoom KR Platform에서 비즈니스를 시작하세요
          </p>

          {/* Form */}
          <form onSubmit={handleSignUp}>
            {/* User Type Selection */}
            <div className="form-group">
              <label className="mb-2">회원 유형 선택</label>
              <div className="row">
                <div className="col-4">
                  <button
                    type="button"
                    className={`btn btn-block ${
                      userType === 'individual'
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setUserType('individual')}
                  >
                    <div className="py-2">
                      <div style={{ fontSize: '2rem' }}>👤</div>
                      <div className="mt-2 font-weight-bold">개인</div>
                      <small className="text-muted">일반 고객</small>
                    </div>
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className={`btn btn-block ${
                      userType === 'business'
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setUserType('business')}
                  >
                    <div className="py-2">
                      <div style={{ fontSize: '2rem' }}>🏢</div>
                      <div className="mt-2 font-weight-bold">사업자</div>
                      <small className="text-muted">개인사업자</small>
                    </div>
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className={`btn btn-block ${
                      userType === 'enterprise'
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setUserType('enterprise')}
                  >
                    <div className="py-2">
                      <div style={{ fontSize: '2rem' }}>🏭</div>
                      <div className="mt-2 font-weight-bold">기업</div>
                      <small className="text-muted">법인사업자</small>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="이름 *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="성 (선택)"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="이메일 주소 *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                placeholder="전화번호 (선택)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="input-group input-group-merge">
                <input
                  type="password"
                  className="form-control form-control-appended"
                  placeholder="비밀번호 (8자 이상) *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fe fe-eye" />
                  </span>
                </div>
              </div>
              <small className="form-text text-muted">
                최소 8자 이상 입력해주세요
              </small>
            </div>

            {/* Error Message */}
            {error && (
              <div className="form-group mb-5">
                <p style={{ color: 'red' }}>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-lg btn-block btn-primary mb-4"
              disabled={isLoading}
            >
              {isLoading ? '처리 중...' : '회원가입'}
            </button>

            {/* Sign In Link */}
            <div className="text-center text-muted">
              이미 계정이 있으신가요?{' '}
              <Link to={ROUTES.AUTH.SIGN_IN}>로그인</Link>
            </div>
          </form>

          {/* OR Separator */}
          <div className="or-container">
            <div className="line-separator" />
            <div className="or-label">또는</div>
            <div className="line-separator" />
          </div>

          {/* Social Login Buttons */}
          <div className="row">
            <div className="social-container">
              <button
                className="btn btn-outline-dark"
                onClick={() => handleOAuthSignUp('google')}
                style={{ textTransform: 'none' }}
              >
                <img
                  width="20px"
                  alt="Google sign-in"
                  src="https://ruoom-django-static-media.s3.amazonaws.com/static/registration/images/google_ruoom.png"
                />
              </button>
            </div>
            <div className="social-container">
              <button
                className="btn btn-outline-dark"
                onClick={() => handleOAuthSignUp('kakao')}
                style={{ textTransform: 'none' }}
              >
                <img
                  width="20px"
                  alt="Kakao sign-in"
                  src="https://ruoom-django-static-media.s3.amazonaws.com/static/registration/images/kakao_ruoom.png"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
