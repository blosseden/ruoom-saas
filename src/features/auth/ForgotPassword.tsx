import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

/**
 * Epic A: Password Reset Request Page
 * 사용자가 이메일을 입력하여 비밀번호 재설정 링크를 요청
 */
const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock 비밀번호 재설정 요청
      // 실제로는 API 호출: await auth.resetPassword(email);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock 성공
      setSuccess(true);
    } catch (err) {
      setError('비밀번호 재설정 요청에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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

              <h2 className="display-4 mb-3">이메일을 전송했습니다</h2>
              <p className="text-muted mb-5">
                <strong>{email}</strong>로 비밀번호 재설정 링크를 전송했습니다.
                <br />
                이메일을 확인하여 링크를 클릭해주세요.
              </p>

              <div className="card mb-4">
                <div className="card-body bg-light">
                  <h6 className="card-title mb-2">이메일을 받지 못하셨나요?</h6>
                  <p className="card-text text-muted small mb-0">
                    스팸 폴더를 확인해보세요. 몇 분 정도 걸릴 수도 있습니다.
                  </p>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate(ROUTES.AUTH.SIGN_IN)}
              >
                로그인 페이지로 돌아가기
              </button>

              <div className="mt-4">
                <Link to={ROUTES.AUTH.SIGN_UP} className="text-muted">
                  회원가입
                </Link>
                {' • '}
                <Link
                  to={ROUTES.AUTH.FORGOT_PASSWORD}
                  className="text-muted"
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                >
                  다시 시도
                </Link>
              </div>
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
          <h1 className="display-4 text-center mb-3">비밀번호 찾기</h1>
          <p className="text-muted text-center mb-5">
            가입하신 이메일 주소를 입력해주세요
            <br />
            비밀번호 재설정 링크를 전송해드립니다
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">이메일 주소</label>
              <input
                type="email"
                className="form-control"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <small className="form-text text-muted">
                가입하신 이메일 주소를 입력해주세요
              </small>
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
              disabled={isLoading}
            >
              {isLoading ? '전송 중...' : '비밀번호 재설정 링크 받기'}
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

export default ForgotPassword;
