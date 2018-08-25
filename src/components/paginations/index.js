import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paginations extends Component {
	constructor(props)
	{
		super(props)
		this.state={
			...this.props
		}
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}

	// Calculate page count
	pageCount()
	{
		return parseInt((this.state.total/this.state.perPage)+(this.state.total%this.state.perPage>0?1:0));
	}

	// Calculate median from buttonsCount state
	median()
	{
		return parseInt(this.state.buttonsCount/2)-(this.state.buttonsCount%2>1?0:1);
	}

	// Go to page handles
	goto(page)
	{
		this.setState({'currentPage':page});
	}

	// Next page handles
	next(e)
	{
		e.preventDefault();
		this.goto(this.state.currentPage-1);
	}

	// Previous page handles
	previous(e)
	{
		e.preventDefault();
		this.goto(this.state.currentPage+1);
	}

	onButtonClick(e, number){
		e.preventDefault();
		this.goto(number);
	}

	// Checking to disable link based on action, example of action: next, previous, ... links
	disabled(action)
	{
		switch(action)
		{
			case 'next':return this.state.currentPage+1>this.pageCount()?true:false;
			case 'previous':return this.state.currentPage-1<=0?true:false;
			default:return true;
		}
	}

	// Calculate start page items to show
	startIndex()
	{
		let startIndex=1;
		if(this.pageCount()<this.state.buttonsCount)
			startIndex=1;
		else if(parseInt(this.state.currentPage/this.state.buttonsCount)>0)
		{
			if((this.state.currentPage-this.median()+this.state.buttonsCount)<=this.pageCount())
				startIndex=this.state.currentPage-this.median();
			else
				startIndex=this.pageCount()-this.state.buttonsCount+1;
		}
		else if(this.state.currentPage%this.state.buttonsCount>this.state.buttonsCount-2)
			startIndex=this.state.currentPage-this.median();

		return startIndex;
	}

	// Calculate end page items to show
	endIndex()
	{
		let endIndex=0;
		let startIndex=this.startIndex();
		if(this.pageCount()===this.state.currentPage)
			endIndex=this.pageCount();
		else if(startIndex+(this.state.buttonsCount-1)<=this.pageCount())
			endIndex=startIndex+(this.state.buttonsCount-1);
		else
			return this.pageCount();

		return endIndex;
	}

	// Generate first page links
	firstPage()
	{
		if(this.startIndex()>this.median())
		{
			let items=[
				<PaginationItem>
				  <PaginationLink
				  href="#"
				  onClick={(e)=>{this.onButtonClick(e, 1)}}>
				  1
					</PaginationLink>
				</PaginationItem>,
				<PaginationItem>
				  <PaginationLink
				  href="#"
				  onClick={(e)=>{this.onButtonClick(e, 2)}}>
				  2
					</PaginationLink>
				</PaginationItem>,
				<PaginationItem  disabled={this.disabled()}>
				  <PaginationLink
				  href="#" >
				  ...
					</PaginationLink>
				</PaginationItem>
			];
			return items;
		}
		return ''
	}

	// Generate last page links
	lastPage()
	{
		if(this.endIndex()+2<this.pageCount())
		{
			let items=[
				<PaginationItem  disabled={this.disabled()}>
				  <PaginationLink
				  href="#" >
				  ...
					</PaginationLink>
				</PaginationItem>,
				<PaginationItem>
				  <PaginationLink
						href="#"
						onClick={(e)=>{this.onButtonClick(e, this.pageCount()-1)}}
					>
				  {this.pageCount()-1}
					</PaginationLink>
				</PaginationItem>,
				<PaginationItem>
				  <PaginationLink
						href="#"
						onClick={(e)=>{this.onButtonClick(e, this.pageCount())}}
					>
				  {this.pageCount()}
					</PaginationLink>
				</PaginationItem>
			];
			return items;
		}
		return ''
	}

	// Loop items using startIndex and endIndex
	renderItem()
	{
		let items=[];
		// console.log('start',this.startIndex())
		// console.log('end',this.endIndex())
		for (let i = this.startIndex(); i <= this.endIndex(); i++) {
			let item=(
				<PaginationItem
					active={i===this.state.currentPage}
					key={i}
					onClick={(e)=>{this.onButtonClick(e, i)}}
				>
					<PaginationLink href="#">
						{i}
					</PaginationLink>
				</PaginationItem>
			)
			items.push(item);
		}
		return items;
	}

	render(){
		if(this.state.total===0)
			return ('')
		return (
			<Pagination size={this.state.size}>
				<PaginationItem  disabled={this.disabled('previous')}>
				  <PaginationLink
						previous
						href="#"
					  onClick={this.next}
					/>
				</PaginationItem>
				{this.firstPage()}
				{this.renderItem()}
				{this.lastPage()}
				<PaginationItem  disabled={this.disabled('next')}>
				  <PaginationLink
						next
						href="#"
					  onClick={this.previous}
					/>
				</PaginationItem>
			</Pagination>
		)
	}
}

Paginations.propTypes = {
	currentPage: propTypes.number,
	lastPage: propTypes.number.isRequired,
	perPage: propTypes.number,
	buttonsCount: propTypes.number,
	total: propTypes.number.isRequired
}

Paginations.defaultProps = {
	currentPage: 1,
	perPage: 10,
	buttonsCount: 8,
}