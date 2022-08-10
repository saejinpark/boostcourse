class Manager {
  constructor(waiting, done, cooking, chef, pos, dashboard) {
    this.waiting = waiting;
    this.done = done;
    this.cooking = cooking;
    this.chef = chef;
    this.pos = pos;
    this.dashboard = dashboard;
  }

  async addOrderToWaiting(menuIdx, orderCnt) {
    for (let i = 0; i < orderCnt; i++) {
      this.waiting.addMenu(menuIdx);
    }
    if (this.cooking.isEmpty()) {
      // 메뉴를 더했으니까, 대기큐를 확인함!
      await this.checkWaiting();
      this.pos.close();
    }
  }

  async checkWaiting() {
    if (!this.waiting.isEmpty() && this.cooking.isEmpty()) {
      await this.makeChefCook();
      this.moveCookingToDone();
      // 요리가 완성되었으니까, 다음 대기큐 확인
      await this.checkWaiting();
    } else {
      console.log("모든 메뉴가 완성되었습니다.");
      // 이벤트 부르기 근데 포스에서 닫아야 함!ㅜㅜ
    }
  }

  async makeChefCook() {
    let menu = this.waiting.removeMenu();
    this.cooking.addMenu(menu);
    this.dashboard.display();
    await this.chef.startCooking(menu);
  }

  moveCookingToDone() {
    this.done.addMenu(this.cooking.removeMenu());
  }
}
export { Manager };
