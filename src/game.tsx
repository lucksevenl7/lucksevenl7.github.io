import * as React from 'react';
import Piece from './piece';

interface Istate {
	next: string,
	points: string[][];
	selected: number[],
	size: number
}


class Game extends React.Component<any, Istate> {

	constructor(props: any) {
		super(props);
		this.state = {
			next: 'B',
			points: [
				['R', 'R', 'R', 'R'],
				['', '', '', ''],
				['', '', '', ''],
				['B', 'B', 'B', 'B']
			],
			selected: [-1, -1],
			size: 4
		};
	}

	public rendRows() {
		return this.state.points.map((row, index) => {
			return (
				<div className="board-row" key={index}>
					{this.rendPoints(row, index)}
				</div>
			);
		});
	}

	public rendPoints(row: string[], i: number) {
		return row.map((pieceType: string, j: number) => {
			return (
				<div className="fhref" key={j} >
					<div className="area" onClick={this.pointOnClick.bind(this, pieceType, i, j)}>
						<Piece type={pieceType} selected={this.state.selected[0]===i && this.state.selected[1]===j} />
					</div>
				</div>

			);
		});
	}

	public isKill(arr: string[], next: string, other: string) {
		return !!(arr.toString() === `${next},${next},${other},`
			|| arr.toString() === `,${next},${next},${other}`
			|| arr.toString() === `,${other},${next},${next}`
			|| arr.toString() === `${other},${next},${next},`
		);
	}

	public isWin() {
		let Rcount = 0;
		let Bcount = 0;
		for (let i = 0; i < this.state.size; ++i) {
			for (let j = 0; j < this.state.size; ++j) {
				if (this.state.points[i][j] === 'R') {
					Rcount++;
				}
				if (this.state.points[i][j] === 'B') {
					Bcount++;
				}
			}
		}

		return Rcount < 2 || Bcount < 2;

	}

	public reset() {
		this.setState({
			next: 'B',
			points: [
				['R', 'R', 'R', 'R'],
				['', '', '', ''],
				['', '', '', ''],
				['B', 'B', 'B', 'B']
			],
			selected: [-1, -1],
			size: 4
		});
	}

	public pointInlastConformKillRule(point:number[],lastConformKillRule:number[][]){
		for (let i = 0; i < lastConformKillRule.length; ++i) {
			if (point.toString() === lastConformKillRule[i].toString()) {
				return true;
			}
		}
		return false;
	}

	public lastConformKillRule(temp:string[][]){
		const lastConformKillRule = [];
		const next = this.state.next;
		const other = this.state.next === 'B' ? 'R' : 'B';

		for (let x = 0; x < this.state.size; ++x) {
			if (this.isKill(temp[x], next, other)) {

				for (let y = 0; y < this.state.size; ++y) {
					if (temp[x][y] === other) {
						lastConformKillRule.push([x,y]);
					}
				}

			}

		}

		for (let z = 0; z < this.state.size; ++z) {
			const column = temp.map((row) => row[z]);
			if (this.isKill(column, next, other)) {

				for (let a = 0; a < this.state.size; ++a) {
					if (temp[a][z] === other) {
						lastConformKillRule.push([a,z]);
					}
				}

			}
		}

		return lastConformKillRule;
	}

	public pointOnClick(pieceType: string, i: number, j: number) {
		if (pieceType === '') {
			if (this.state.selected[0] === -1) {
				alert('请先选择要移动的棋子');
			} else if (this.canMove(i, j)) {
				const next = this.state.next;
				const other = this.state.next === 'B' ? 'R' : 'B';
				const temp = this.state.points.slice();
				const lastConformKillRule = this.lastConformKillRule(temp);

				temp[i][j] = temp[this.state.selected[0]][this.state.selected[1]];
				temp[this.state.selected[0]][this.state.selected[1]] = '';

				

				for (let x = 0; x < this.state.size; ++x) {
					if (this.isKill(temp[x], next, other)) {

						for (let y = 0; y < this.state.size; ++y) {
							if (temp[x][y] === other
								&& !this.pointInlastConformKillRule([x,y],lastConformKillRule)
								) {
								temp[x][y] = '';
							}
						}

					}

				}

				for (let z = 0; z < this.state.size; ++z) {
					const column = temp.map((row) => row[z]);
					if (this.isKill(column, next, other)) {

						for (let a = 0; a < this.state.size; ++a) {
							if (temp[a][z] === other
								&& !this.pointInlastConformKillRule([a,z],lastConformKillRule)) {
								temp[a][z] = '';
							}
						}

					}
				}


				this.setState({
					next: other,
					points: temp
				});

				if (this.isWin()) {
					alert(`游戏结束。 ${this.state.next === 'B' ? '蓝色方 胜利' : '红色方 胜利'} `);
					this.reset();
				}

			}

		}
		if (this.state.next !== pieceType) {
			return;
		}
		this.setState({
			selected: [i, j]
		});
	}

	public canMove(i: number, j: number) {
		return Math.pow(i - this.state.selected[0], 2) + Math.pow(j - this.state.selected[1], 2) === 1;
	}


	public render() {

		return (
			<div>
				<div className="status">下一步:{this.state.next === 'B' ? '蓝色方' : '红色方'}</div>
				<div className="bg">
					{this.rendRows()}
				</div>
			</div>

		);
	}
}

export default Game;