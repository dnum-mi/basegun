# Changelog

## [4.1.0](https://github.com/dnum-mi/basegun/compare/v4.0.0...v4.1.0) (2025-01-20)


### Features

* :lock: add contact details endpoint and api call ([b809a2d](https://github.com/dnum-mi/basegun/commit/b809a2d4a61f78a8761dedcf3dbd3c7bae26cb97))
* :lock: hide ircgn email ([6493b80](https://github.com/dnum-mi/basegun/commit/6493b80f3a966d749af95b658fab8d2f30e37c2d))
* :loud_sound: add logs related to authentication ([6594eb4](https://github.com/dnum-mi/basegun/commit/6594eb40beb8ad0324fd1ead58ab3e5dc6cb6a43))
* :passport_control: implement rate limit on api requests ([56439f2](https://github.com/dnum-mi/basegun/commit/56439f2613ff4f87cef85ae8ef3cefe0871ad554))
* :sparkles: add alarm gun detection api and tests ([2e981cd](https://github.com/dnum-mi/basegun/commit/2e981cdcbb4168f21e819489e80a3b3185f81aad))
* :sparkles: add api route and tests for alarm gun detection ([04c7fcc](https://github.com/dnum-mi/basegun/commit/04c7fcc840c93afe0445299ef3ae4b38f5bf1557))
* :sparkles: add dummy identification for lever rifle and semi-automatic or automatic long gun ([4c58fa7](https://github.com/dnum-mi/basegun/commit/4c58fa723d16081c5db4afa54fe1723e0b88781c))
* :sparkles: add dummy shotgun identification ([14cce76](https://github.com/dnum-mi/basegun/commit/14cce766c58f4012004daf47e2ed29f3113cac77))
* :sparkles: add email client with local email server ([6955bad](https://github.com/dnum-mi/basegun/commit/6955bad8b7fbe3f57a8b0396218723d9bfe453aa))
* :sparkles: add endpoint to contact experts via email ([b3c9576](https://github.com/dnum-mi/basegun/commit/b3c9576ffe419875aa5d96d560238897345c03f4))
* :sparkles: add endpoint to contact experts via email ([de89ff2](https://github.com/dnum-mi/basegun/commit/de89ff24098359e11e2e2e52280ebc8d26923d9e))
* :sparkles: add pictures as email attachements ([3210393](https://github.com/dnum-mi/basegun/commit/321039395f118846cd01f2b783d193f38f5a554e))
* :sparkles: finalize expert form contact with email attachment ([0277854](https://github.com/dnum-mi/basegun/commit/0277854a5bc027d69cf2b0217d80865511f31e14))
* :sparkles: implementation ocr module for blank guns ([900aa3c](https://github.com/dnum-mi/basegun/commit/900aa3c108cbfadcd9138b395dcfc447f95c0f1b))
* :technologist: add healthcheck for Keycloak service in docker-compose.yml ([4a92bd3](https://github.com/dnum-mi/basegun/commit/4a92bd39b5b3f838b04405d2fc7ec187b23a4fff))
* :zap: automatically retrieve jwks ([cb16ce3](https://github.com/dnum-mi/basegun/commit/cb16ce30f0c5a876f282fbab2c4033a05388b030))


### Bug Fixes

* :bug: change auth_idp and cheops to idp and Cheops ([9ca0aae](https://github.com/dnum-mi/basegun/commit/9ca0aaeb7825e404f60b8603ba80aeda3d020c23))
* :bug: fix authentication by adding audience in jwt decode ([661fc98](https://github.com/dnum-mi/basegun/commit/661fc98a86433298b1ee9a416b4f63efe938f8ab))
* :bug: fix redirection after login with Passage 2 ([b5cde1e](https://github.com/dnum-mi/basegun/commit/b5cde1ee3cb358c255a994f3e5a418e6283052bd))
* :bug: fix refresh accesstoken every seconds ([e2e7232](https://github.com/dnum-mi/basegun/commit/e2e723240bafbae667571a8e98fbc7f62c566c0a))
* :bug: fix timout while sending emails ([9471ae1](https://github.com/dnum-mi/basegun/commit/9471ae1481f1395a015e756bfceac36534bb3fca))
* :bug: make markings_pictures optional ([cc6bbdc](https://github.com/dnum-mi/basegun/commit/cc6bbdc47c9ba82fa5880c136a822c16b1ad81af))
* :bug: Put clean registy on separate job in ci ([c872646](https://github.com/dnum-mi/basegun/commit/c8726468fd0f948f9dc56eaa2a808337db89d072))
* :bug: remove measure model call when confidence level is low ([f6ea811](https://github.com/dnum-mi/basegun/commit/f6ea81108d4839591b39dbb7c6dd9fa2ccacf143))
* :bug: show message for all user other than proxyma in expert contact ([00a3d09](https://github.com/dnum-mi/basegun/commit/00a3d09ee97c658386f8bc1a4839a403447ac4c0))
* :construction_worker: fix ci build reusable workflow ([db4a4f9](https://github.com/dnum-mi/basegun/commit/db4a4f9c354d4cc1fc3480d682e02192c0a792f2))
* :lipstick: use alerts instead of modal for expert form submission ([714487f](https://github.com/dnum-mi/basegun/commit/714487f44d6c06d77cdaa5cda08b9fca8eb86457))
* :lock: set server_tokens to off in nginx conf ([2bcd626](https://github.com/dnum-mi/basegun/commit/2bcd6268394a2d7a1698a7b57288aea7296ee1ce))
* :wheelchair: fix accessibilities issues ([fcc3de5](https://github.com/dnum-mi/basegun/commit/fcc3de5cd10084c00b3c7dc94b4ec524a8e6c7b0))
* :white_check_mark: ignore errors in coverage xml generation ([371c3c1](https://github.com/dnum-mi/basegun/commit/371c3c1247840cdf51576667dce6010620c9e182))
* :white_check_mark: Updating API tests that uses authentification ([0d8d6a2](https://github.com/dnum-mi/basegun/commit/0d8d6a234efb166895e2a629a0a625004cb34764))
* 🐛 fix value not found on contact expert form ([66627f9](https://github.com/dnum-mi/basegun/commit/66627f9e0c53aeb35362cc43c3eec46b109b99ca))
