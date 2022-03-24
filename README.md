# Farmersworld claim-bot

Simple farmersworld claim-bot for novices.

## Installation

1. Clone repository

```bash
git clone Splash-07/fw-bot
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

- Claim tools, membership cards
- Restore energy (optionally)
- Repair tools (optionally)
- Storing charges depending on quantity and grade of membership cards (less CPU usage)

## Bot workflow

1. Login with wax.wallet
2. Fetch blockchain data with eosio rpc api
3. Auto fetch data every 30sec
4. Finding tool or mbs card with lowest cooldown (adjusted according mbs cards that you have, checking if charges can be stored)
5. If cooldown is over -> prefoming energy restore action / repair action if conditions are meet -> performing claim action
6. Repeating 4th and 5th steps

##

Pull requests are welcome. For feature requests and bug reports, please open an issue first to discuss what you would like to change.

Thanks [Shr1xy](https://github.com/Shr1xy) for account sharing for testing.

More profound version of farmersworld bot [by shakhruz](https://github.com/shakhruz/angelfarmers-ui).
![Alt text](/public/FWbot.png)
