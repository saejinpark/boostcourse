stocks = "삼성전자/10/85000,카카오/15/130000,LG화학/3/820000,NAVER/5/420000"
sells = [82000, 160000, 835000, 410000]


def stock_profit(stocks, sells):
    stock_list = stocks.split(",")

    for i in range(len(stock_list)):
        stock = {}
        tmp = stock_list[i].split("/")
        stock["name"] = tmp[0]
        stock["count"], stock["blended"] = int(tmp[1]), int(tmp[2])
        stock["sell"] = sells[i]
        stock["yld"] = round((stock["sell"] / stock["blended"] - 1) * 100, 2)

        stock_list[i] = stock

    stock_list.sort(key=lambda x: x["yld"], reverse=True)

    for stock in stock_list:
        print(f"{stock['name']}의 수익률 {stock['yld']}")


stock_profit(stocks, sells)
