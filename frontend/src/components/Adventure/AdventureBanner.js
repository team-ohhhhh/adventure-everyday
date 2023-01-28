import "./AdventureBanner.css"




function AdventureBanner() {
 const  dummy = {
    // adventureId : 1,
    title: '걷기 딱 좋은 탐험',
    difficulty: 'easy',
    backgroundImage: "AdventureDummy.jpg",
    adventureMakerProfile: 'profile.jpg',
    adventureMakerName: 'snowman',
    advetureMakerTier: 'bronze',
    particpantsList : []
  }

  return (
    // 그래디언트의 끝과 끝 점의 색상을 모두 반투명하게 하고 이미지 파일 위에 그래디언트가 오버랩 되는 방식..?
    <div className="banner" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${dummy.backgroundImage})`}}>
      <div className="titleAndDifficulty">
        <div className="title">
          {dummy.title}
        </div>
        <div className="difficulty">
          {dummy.difficulty}
        </div>
      </div>
      <div className="makerAndParticipants">
        <div className="maker">
          <div className="makerProfileContainer"><img className="makerProfile" src={dummy.adventureMakerProfile}/></div>
          <div className="makerNameAndTierContainer">
            <span>탐험가</span>
            <div className="makerNameAndTier"> <span className="makerName"> { dummy.adventureMakerName } </span> <img src={dummy.advetureMakerTier + '.png'}/></div>
          </div>
        </div>
        <div className="participants">
          participants
        </div>
      </div>
    </div>
  )
}

export default AdventureBanner