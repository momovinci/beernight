// 질문 데이터
export interface Question {
  id: number;
  text: string;
}

export const questions: Question[] = [
  { id: 1, text: "튜터님들은 캠프 기간동안 살이 많이 찌셨나요?" },
  { id: 2, text: "튜터님의 최애 음식이나 맥주는 무엇인가요?" },
  { id: 3, text: "주량이 어떻게 되시나요?" },
  { id: 4, text: "지금까지 겪으셨던 회식 메뉴 중 가장 인상깊었던 메뉴는 무엇인가요? (긍정적/부정적 어느 쪽이건요 😆)" },
  { id: 5, text: "매운거 좋아하세용? 민초파세용?" },
  { id: 6, text: "버터떡 드셔보셨나요?" },
  { id: 7, text: "두쫀쿠 드셔보셨나요?" },
  { id: 8, text: "튜터님들의 커피 취향이 궁금해요!" },
  { id: 9, text: "쉬는 날엔 무엇을 하며 보내시나요?" },
  { id: 10, text: "휴일에는 보통 뭘 하시나요? 여행이나 다양한 경험을 하시는지도 알고 싶어요 🥰" },
  { id: 11, text: "튜터님들의 취미생활과 하루 루틴이 궁금해요!" },
  { id: 12, text: "튜터님들은 스트레스를 받았을 때 어떻게 푸시는지 궁금해요!" },
  { id: 13, text: "별자리가 어떻게 되시나요?" },
  { id: 14, text: "튜터님의 가장 좋아했던 드라마가 있다면 무엇인가요?" },
  { id: 15, text: "튜터님들이 겪으신 최악의 클라이언트 경험이 궁금해요!" },
  { id: 16, text: "반려동물이 있으시다면 자랑 한 번씩만...🥺" },
  { id: 17, text: "튜터님들은 돌잡이 때 뭐 잡으셨나요?" },
  { id: 18, text: "사주를 믿으시나요? 가장 최근에 본 사주 내용 궁금해요!" },
  { id: 19, text: "귀신이 있다고 생각하시나요?" },
  { id: 20, text: "튜터님들이 가장 무서워하는 것은 무엇인가요?" },
  { id: 21, text: "튜터님들 중에 누구의 ZEP 캐릭터가 가장 예쁘다고 생각하시나요?" },
  { id: 22, text: "튜터님들의 학창시절 별명이 있으신가요?" },
  { id: 23, text: "혈액형이 어떻게 되시나요?" },
  { id: 24, text: "재밌게 읽은 책 추천해주세요?" },
  { id: 25, text: "발 사이즈가 어떻게 되시나요?" },
  { id: 26, text: "몇 세대 아이돌까지 알고 계시나요?" },
  { id: 27, text: "튜터님의 최애 아이돌은 누구인가요?" },
  { id: 28, text: "좋아하는 계절은 뭔가요?" },
];

// 답변자 데이터
export interface Respondent {
  id: number;
  name: string;
  photo: string;
}

export const respondents: Respondent[] = [
  { id: 1, name: "홍윤정 튜터", photo: "https://i.ibb.co/bjK7gBSw/Property-1-1.png" },
  { id: 2, name: "남궁찬양 튜터", photo: "https://i.ibb.co/50w50yz/Property-1-1.png" },
  { id: 3, name: "정기식 튜터", photo: "https://i.ibb.co/kskMX95c/Property-1-1.png" },
  { id: 4, name: "김다희 튜터", photo: "https://i.ibb.co/35q55hRV/Property-1-1.png" },
  { id: 5, name: "박소연 튜터", photo: "https://i.ibb.co/JjJFK1yr/Property-1-1.png" },
  { id: 6, name: "김훈 튜터", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU0ODY5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 7, name: "송조해 튜터", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU0ODY5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
];