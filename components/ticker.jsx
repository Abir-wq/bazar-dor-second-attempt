import { money, unit } from "@/lib/format.mjs";
import { Change } from "./products";
export default function Ticker({ products }) { return <div className="ticker" aria-label="পণ্যের দামের পরিবর্তন"><div className="ticker-track">{[0,1].map(copy=><div className="ticker-group" key={copy} aria-hidden={copy === 1}>{products.map(p=><span className="ticker-item" key={p.id}>{p.image} {p.nameBn}<strong>{money(p.today)}/{unit(p.unit)}</strong><Change change={p.change}/></span>)}</div>)}</div></div>; }
