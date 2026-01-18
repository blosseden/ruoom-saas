import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

/**
 * Epic A: Password Reset Confirmation Page
 * 사용자가 이메일 링크를 클릭한 후 새 비밀번호를 입력
 */
const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  // 비밀번호 강도 계산
  const calculatePasswordStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (pwd.length >= 12) strength += 1;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 1;
    if (/\d/.test(pwd)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 1;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);
  const passwordStrengthLabel =
    password.length === 0
      ? ''
      : passwordStrength <= 2
        ? '약함'
        : passwordStrength <= 3
          ? '보통'
          : '강함';

  const passwordStrengthColor =
    passwordStrength <= 2
      ? '#dc3545'
      : passwordStrength <= 3
        ? '#ffc107'
        : '#28a745';

  useEffect(() => {
    // Mock 토큰 검증
    if (!token) {
      setIsTokenValid(false);
      setError('유효하지 않은 링크입니다.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setError('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      // Mock 비밀번호 재설정
      // 실제로는 API 호출: await auth.updatePassword(token, password);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock 성공
      setSuccess(true);
    } catch (err) {
      setError('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 토큰이 유효하지 않은 경우
  if (!isTokenValid) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 my-5">
            <div className="text-center">
              {/* Error Icon */}
              <div
                className="mb-4"
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto',
                  borderRadius: '50%',
                  background: '#f8d7da',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i
                  className="fe fe-alert-circle"
                  style={{ fontSize: '40px', color: '#721c24' }}
                />
              </div>

              <h2 className="display-4 mb-3">유효하지 않은 링크</h2>
              <p className="text-muted mb-5">
                비밀번호 재설정 링크가 유효하지 않거나 만료되었습니다.
              </p>

              <button
                className="btn btn-primary mb-4"
                onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
              >
                비밀번호 재설정 다시 요청
              </button>

              <div>
                <Link to={ROUTES.AUTH.SIGN_IN} className="text-muted">
                  로그인 페이지로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 성공 메시지 표시
  if (success) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 my-5">
            <div className="text-center">
              {/* Success Icon */}
              <div
                className="mb-4"
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto',
                  borderRadius: '50%',
                  background: '#d4edda',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i
                  className="fe fe-check"
                  style={{ fontSize: '40px', color: '#155724' }}
                />
              </div>

              <h2 className="display-4 mb-3">비밀번호가 변경되었습니다</h2>
              <p className="text-muted mb-5">
                새 비밀번호로 성공적으로 변경되었습니다.
                <br />
                이제 새 비밀번호로 로그인할 수 있습니다.
              </p>

              <button
                className="btn btn-lg btn-primary"
                onClick={() => navigate(ROUTES.AUTH.SIGN_IN)}
              >
                로그인하러 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6 my-5">
          {/* Header */}
          <h1 className="display-4 text-center mb-3">새 비밀번호 설정</h1>
          <p className="text-muted text-center mb-5">
            안전한 비밀번호를 입력해주세요
            <br />
            최소 8자 이상, 영문, 숫자, 특수문자 조합을 권장합니다
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="form-group">
              <label className="form-label">새 비밀번호</label>
              <div className="input-group input-group-merge">
                <input
                  type="password"
                  className="form-control form-control-appended"
                  placeholder="새 비밀번호 (8자 이상)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fe fe-eye" />
                  </span>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">비밀번호 강도:</small>
                    <small
                      className="font-weight-bold"
                      style={{ color: passwordStrengthColor }}
                    >
                      {passwordStrengthLabel}
                    </small>
                  </div>
                  <div
                    className="progress"
                    style={{ height: '6px', marginTop: '5px' }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: passwordStrengthColor,
                      }}
                    />
                  </div>
                </div>
              )}

              <small className="form-text text-muted">
                최소 8자 이상 입력해주세요
              </small>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">비밀번호 확인</label>
              <div className="input-group input-group-merge">
                <input
                  type="password"
                  className="form-control form-control-appended"
                  placeholder="비밀번호 다시 입력"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fe fe-eye" />
                  </span>
                </div>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword.length > 0 && (
                <small
                  className={`form-text ${
                    password === confirmPassword
                      ? 'text-success'
                      : 'text-danger'
                  }`}
                >
                  {password === confirmPassword ? (
                    <i className="fe fe-check-circle" />
                  ) : (
                    <i className="fe fe-x-circle" />
                  )}{' '}
                  {password === confirmPassword
                    ? '비밀번호가 일치합니다'
                    : '비밀번호가 일치하지 않습니다'}
                </small>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-lg btn-block btn-primary mb-3"
              disabled={isLoading || password !== confirmPassword}
            >
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </button>

            {/* Back to Sign In */}
            <div className="text-center">
              <Link to={ROUTES.AUTH.SIGN_IN} className="text-muted">
                <i className="fe fe-arrow-left mr-1" />
                로그인 페이지로 돌아가기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
