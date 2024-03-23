<div align="center">
   
# 차량 수리내역 조회 시스템

# 1-1. 개발기간

2024.02 ~ 2024.03

***

# 1-2. 개발목적

블록체인을 이용해 차량의 정보(차량번호, 차주, 등록날짜, 제조일자)와 차량의 수리내역(차량번호, 수리일자, 수리내역, 수리비용)을 투명하게 공개할 수 있고,<br/>
데이터의 변조나 조작이 어려워지므로 차량 수리 내역이 변경되거나 조작되는 것을 방지할 수 있습니다.<br/><br/>
거래가 발생할 때마다 실시간으로 업데이트되므로, 차량 수리 내역에 대한 최신 정보를 제공할 수 있기 때문에 <br/>차량 소유자나 이용자가 언제든지 필요한 정보를 얻을 수 있습니다.<br/><br/>
수리 과정이 문서화되기 때문에 추적이 용이해지고, 차량의 유지 보수 이력을 신속하게 확인할 수 있어 <br/>잠재적인 문제 발생 시 해당 문제를 추적하여 조치할 수 있습니다.
   
***

# 2-1. 개발환경

### Environment

<img src="https://img.shields.io/badge/Visual&nbsp;Studio&nbsp;Code-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=Linux&logoColor=white"/><br/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
<img src="https://img.shields.io/badge/NodeJS-339933?style=flat-square&logo=NodeJS&logoColor=white"/>

### Development

<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
<img src="https://img.shields.io/badge/Angular-0F0F11?style=flat-square&logo=Angular&logoColor=white"/>
<img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=Go&logoColor=white"/>

***

# 2-2. 버전

cURL <br/>
도커Docker Community Edition CE 23.0.6 <br/>
도커 Compose 1.27.4<br/>
Go 1.16.7 <br/>
Python 2.7.18 <br/>
Node.js 12.13.1 <br/>
npm 5.6.0 <br/>


# 2-3. 환경 설정
</div>

```
git clone https://github.com/JHL222/dev-mode.git
```
```
cd $GOPATH/src/dev-mode
cp -r ../fabric-samples/bin/ .
```
```
./network.sh start
```
```
cd $GOPATH/src/dev-mode
./network.sh installCC abstore
./network.sh checkCC
./network.sh upgradeCC abstore 1.1.0
```
```
./network.sh startSDK
```

<div align="center">

# 3. 화면구성

||사진||
|------|---|---|
|<img width="500" alt="1" src="https://github.com/JHL222/dev-mode/assets/160108023/251e9718-b997-4b8b-94de-243ffb618070">|<img width="500" alt="2" src="https://github.com/JHL222/dev-mode/assets/160108023/951cfc38-5806-4003-ae68-d477320a6ccd">|<img width="500" alt="3" src="https://github.com/JHL222/dev-mode/assets/160108023/b87f9b0b-d2b5-4333-8f5a-5a017a132694">|
|메인페이지1|메인페이지2|차량 정보 등록|
|<img width="500" alt="4" src="https://github.com/JHL222/dev-mode/assets/160108023/1817fd07-21b5-48e8-bf3d-aee03d57be60">|<img width="500" alt="5" src="https://github.com/JHL222/dev-mode/assets/160108023/70050f86-1000-4b99-93d0-d8f4a134a707">|<img width="500" alt="6" src="https://github.com/JHL222/dev-mode/assets/160108023/9c6f546d-0c11-4558-af2c-8c61a6886fff">|
|차량 정보 조회|차량 수리내역 등록|차량 수리내역 조회|
||<img width="500" alt="7" src="https://github.com/JHL222/dev-mode/assets/160108023/e1ead211-61db-4d66-a1df-5bdbb57c20e1">||
||함수 실행 시 터미널 로그||

***

# 4. 주요 기능

∙차량 등록 기능 <br/>
∙차량 조회 기능 <br/>
∙차량 수리내역 등록 기능 <br/>
∙차량 수리내역 조회 기능 <br/>

</div>
