import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paginations extends Component {
	constructor(props)
	{
		super(props)
		this.state={
			...this.props
		}
	}

	// Calculate page count
	pageCount()
	{
		return parseInt((this.state.total/this.state.perPage)+(this.state.total%this.state.perPage>0?1:0));
	}

	// Calculate median from maxPage state
	median()
	{
		return parseInt(this.state.maxPage/2)-(this.state.maxPage%2>1?0:1);
	}

	prevPageUrl()
	{
		return this.state.prevPageUrl===null;
	}

	nextPageUrl()
	{
		return this.state.nextPageUrl===null;
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
		if(this.pageCount()<this.state.maxPage)
			startIndex=1;
		else if(parseInt(this.state.currentPage/this.state.maxPage)>0)
		{
			if((this.state.currentPage-this.median()+this.state.maxPage)<=this.pageCount())
				startIndex=this.state.currentPage-this.median();
			else
				startIndex=this.pageCount()-this.state.maxPage+1;
		}
		else if(this.state.currentPage%this.state.maxPage>this.state.maxPage-2)
			startIndex=this.state.currentPage-this.median();
	
		return startIndex;
	}

	// Calculate end page items to show
	endIndex()
	{
		let endIndex=0;
		let startIndex=this.startIndex();
		if(this.pageCount()==this.state.currentPage)
			endIndex=this.pageCount();
		else if(startIndex+(this.state.maxPage-1)<=this.pageCount())
			endIndex=startIndex+(this.state.maxPage-1);
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
				  onClick={(e)=>{e.preventDefault();this.goto(1)}}>
				  1
					</PaginationLink>		
				</PaginationItem>,
				<PaginationItem>
				  <PaginationLink 
				  href="#" 
				  onClick={(e)=>{e.preventDefault();this.goto(2)}}>
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
				  onClick={(e)=>{e.preventDefault();this.goto(this.pageCount()-1)}}>
				  {this.pageCount()-1}
					</PaginationLink>		
				</PaginationItem>,
				<PaginationItem>
				  <PaginationLink 
				  href="#"
				  onClick={(e)=>{e.preventDefault();this.goto(this.pageCount())}}>
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
	 						active={i==this.state.currentPage} 
	 						key={i} 
	 						onClick={(e)=>{e.preventDefault(); this.goto(i)}}
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
		if(this.state.total==0)
			return ('')
		return (
			<Pagination size={this.state.size}>
				<PaginationItem  disabled={this.disabled('previous')}>
				  <PaginationLink 
				  previous 
				  href="#" 
				  onClick={this.next.bind(this)}/>
				</PaginationItem>
				{this.firstPage()}
				{this.renderItem()}
				{this.lastPage()}
				<PaginationItem  disabled={this.disabled('next')}>
				  <PaginationLink 
				  next 
				  href="#" 
				  onClick={this.previous.bind(this)}/>
				</PaginationItem>
			</Pagination>
		)
	}
}