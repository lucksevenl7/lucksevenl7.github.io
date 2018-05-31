import * as React from 'react';
import blue   from './blue.png';
import red   from './red.png';
	
interface Iprop{
	type:string;
	selected:boolean;
}

class Piece extends React.Component<Iprop,any> {
	
	public render(){
		if (this.props.type==='R') {
			return (
				<img className={this.props.selected?"shake-slow shake-constant":""} src={red} />
			);
		}else if(this.props.type==='B'){
			return (
				<img className={this.props.selected?"shake-slow shake-constant":""} src={blue} />
			);
		}else{
			return 'X';
		}

	}
}
export default Piece;