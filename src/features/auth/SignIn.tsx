import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { auth } from '@/lib/mockSupabase';

/**
 * Epic A: Sign In Page (Bootstrap Style)
 * - Email/Password Login
 * - OAuth Login (Kakao, Google)
 */
const SignIn: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await auth.signIn(email, password);

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        const userType = data.user.user_metadata?.userType;

        if (userType === 'business' || userType === 'enterprise') {
          navigate(ROUTES.BUSINESS.DASHBOARD);
        } else {
          navigate(ROUTES.CUSTOMER.MY_PAGE);
        }
      }
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'kakao' | 'google') => {
    try {
      const { error } = await auth.signInWithOAuth(provider);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('OAuth 로그인에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6 my-5 custom-login-box">
          {/* Header */}
          <h1 className="display-4 text-center mb-3">로그인</h1>
          <p className="text-muted text-center mb-5">
            Ruoom KR Platform에 오신 것을 환영합니다
          </p>

          {/* Form */}
          <form onSubmit={handleEmailSignIn}>
            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="row">
                <div className="col-auto">
                  <Link
                    to={ROUTES.AUTH.FORGOT_PASSWORD}
                    className="form-text small text-muted"
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
              </div>

              <div className="input-group input-group-merge">
                <input
                  type="password"
                  className="form-control form-control-appended"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fe fe-eye" />
                  </span>
                </div>
              </div>
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
              className="btn btn-lg btn-block btn-primary mb-3"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>

            {/* Sign Up Link */}
            <p className="text-center mb-0 mt-4">
              <span className="text-muted">계정이 없으신가요? </span>
              <Link to={ROUTES.AUTH.SIGN_UP}>회원가입</Link>
            </p>
          </form>

          {/* OR Separator */}
          <div className="or-container">
            <div className="line-separator" />
            <div className="or-label">or</div>
            <div className="line-separator" />
          </div>

          {/* Social Login Buttons */}
          <div className="row">
            <div className="social-container">
              <button
                className="btn btn-outline-dark"
                onClick={() => handleOAuthSignIn('google')}
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
                onClick={() => handleOAuthSignIn('kakao')}
                style={{ textTransform: 'none' }}
              >
                <img
                  width="20px"
                  style={{ marginRight: '5px' }}
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

export default SignIn;
