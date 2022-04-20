# Farmersworld bot

Simple farmersworld bot for:
- claiming tools, membership cards, crops
- raising and feeding animals

Can be launched via VScode (on local host) or used from web page

## Installation

1. Clone repository to the **current drectory**

```bash
git clone https://github.com/Splash-07/fw-bot .
```

2. Install all dependencies

```bash
npm i
```

3. Start bot on localhost

```bash
npm start
```

## Features

- Claim tools, membership cards, crops
- Raising animals
- Feeding animals
- Feeding chicks and dairy cow (optionaly)
- Restore energy (optionally)
- Repair tools (optionally)
- Storing charges depending on quantity and grade of membership cards (less CPU usage)

## Bot workflow

1. Login with wax.wallet
2. Fetch blockchain data with eosio rpc api
3. Auto fetch data every 26sec
4. Finding asset with lowest cooldown (adjusted according mbs cards that you have, checking if charges can be stored)
5. If cooldown is over -> prefoming energy restore action / repair action if conditions are meet -> performing claim \ feed action
6. If there no food for feeding animals -> skiping this asset
7. Repeating 4th - 6th steps

##

Pull requests are welcome. For feature requests and bug reports, please open an issue first to discuss what you would like to change.

Thanks [Shr1xy](https://github.com/Shr1xy) for account sharing for testing.

More profound version of farmersworld bot [by shakhruz](https://github.com/shakhruz/angelfarmers-ui).
![Alt text](/public/FWbot.png)
