# 🗺️ Redistricting Analysis Web Platform
**미국 SMD(단일 선거구)와 MMD(다중 선거구) 기반 선거구 재조정(Redistricting) 분석 웹사이트**

<img width="1162" alt="스크린샷 2025-03-07 오전 2 08 19" src="https://github.com/user-attachments/assets/facac015-1dfc-4f4c-a7d5-e2dd97951a08" />

## 📌 프로젝트 개요
- SMD vs MMD 비교 분석: 정치적 공정성을 평가하기 위한 다양한 데이터 시각화 제공
- 게리맨더링(Gerrymandering) 효과 분석: 특정 정당이 선거구를 조작할 가능성을 줄이기 위한 객관적 지표 제공
- 데이터 시뮬레이션: ReCom 알고리즘 및 Gluing 알고리즘을 활용 -> 다양한 선거구 시뮬레이션 결과 생성

## 🫂 팀원 및 역할
||이름|역할|담당업무|
|--|------|---|-----|
|💡|정효종|Pre-processing Data| 데이터 정리, Seawulf 클러스터 활용/연산|
|💎|조현준|Post-processing Data| 데이터 변환, API 응답 최적화|
|🕯️|홍신애|Backend| API 개발, 데이터 처리, DTO 설계|
|⚡️|하연경|Frontend| UI/UX 개발, 데이터 시각화|

## 🚀 주요 기능
### ✅ 선거구 데이터 분석
**기존 단일 선거구(SMD) vs 다중 선거구(MMD) 비교**
- 정당 분포 분석: 각 선거구별 정당 점유율(공화당 vs 민주당) 비교
- 소수 인종 기회 선거구 분석(Opportunity Districts)
- 게리맨더링 효과 분석: Seat-Vote Curve, Box-Whisker Plot을 활용한 공정성 평가

### ✅ 랜덤 선거구 시뮬레이션
- Seawulf 클러스터를 활용하여 5,000개 이상의 랜덤 선거구 데이터 생성
- SMD 기반으로 MMD 선거구를 자동 생성(Gluing Algorithm 적용)
- 선거 결과 예측을 위한 MMD 선거 알고리즘 적용

### ✅ 데이터 시각화
- 지도 인터페이스: 특정 주(State) 선택 후 선거구 정보 확인
- Bar Chart: 선거구별 정당 점유율 및 소수 인종 비율 비교
- Box-Whisker Plot: SMD 및 MMD 기반 선거구 분포 분석

## 📆 프로젝트 관리 및 협업 도구
- Notion: 회의록, 데이터 정리, 피드백 관리
- LucidChart: UML 다이어그램 (시퀀스 다이어그램, 서버 클래스 다이어그램)
